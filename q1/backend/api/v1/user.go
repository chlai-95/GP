package v1

import (
	core "q1_backend/core"
	"q1_backend/models"
	"q1_backend/helpers"

	"github.com/gofiber/fiber/v2"
)

// Setting up all the API Routes with specific grouping
func MountRouter(versioned_api fiber.Router) {

	// Create new API group, this will be part of the request URL
	// Example: example.com/api/versioning_tag/{user_api}
	user_api := versioned_api.Group("/user")

	// Define and mount the handle for each different request route
	user_api.Get("/list", ListUsers)
	user_api.Get("/:id", FindUser)
	user_api.Post("/new", NewUser)
	user_api.Patch("/:id", PatchUser)
	user_api.Delete("/:id", DeleteUser)
}

//	ListUsers is a function to get all users from database with pagination enabled
//	@Summary			Get all users
//	@Description		Get all users
//	@Tags				User
//	@Produce			json
//	@Param				query query models.SearchQueries true "Criterials"
//	@Success			200 {object} models.ApiResponse{hits=[]models.User}
//	@Failure			500	{object} models.ApiResponse{}
//	@Router				/v1/user/list	[get]
func ListUsers(c *fiber.Ctx) error {
	var total int64
	
	// Define which model to use
	sq := new(models.SearchQueries)

	// Define which model and table to use in database
	users := []models.User{}

	// Define default response message
	message := "Search return with success status"

	// Try to get the submitted search query from the URL query
	if err := c.QueryParser(sq); err != nil {
		panic(err)
	}

	// Setting default value for "Limit" if can't find any value in submitted search query
	if sq.Limit < 1 || sq.Limit > 100 {
		sq.Limit = 10
	}

	// Setting default value for "OrderBy" if can't find any value in submitted search query
	if sq.OrderBy == "" {
		sq.OrderBy = "id"
	}

	// Setting default value for "SortOrder" if can't find any value in submitted search query
	if sq.SortOrder == "" {
		sq.SortOrder = "asc"
	}

	// Generate ORDER BY SQL query
	order_query := sq.OrderBy + " " + sq.SortOrder

	// Try to get total of users in database to populate the "Total" in response
	if err := core.DBConn.Model(&users).Count(&total).Error; err != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, *sq, users, total, len(users), err.Error()))
	}

	// Try to get certain amount of users in pre-defined order using search query
	if err := core.DBConn.Order(order_query).Limit(sq.Limit).Offset(sq.Skip).Find(&users).Error; err != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, *sq, users, total, len(users), err.Error()))
	}

	if len(users) == 0 {

		// Set specific message in response when no users found in database
		message = "No record(s) found."
	}

	// Return expected response with status "OK"
	return c.Status(200).JSON(helpers.ApiResponse(true, *sq, users, total, len(users), message))
}

//	FindUser is a function to get specific user from database that match with provided Id
//	@Summary			Get user details
//	@Description		Get user details by Id
//	@Tags				User
//	@Produce			json
//	@Param				id path string true "User ID"
//	@Success			200 {object} models.ApiResponse{hits=[]models.User}
//	@Failure			500	{object} models.ApiResponse{}
//	@Router				/v1/user/{id}	[get]
func FindUser(c *fiber.Ctx) error {

	// Define which model and table to use in database
	users := []models.User{}

	// Define default response message
	message := "Search return with success status"

	// Define default total in response message
	total := int64(0)

	// Try to get the targeted user ID from the URL query
	id := c.Params("id")

	// Generate default response message
	query := `"id": ` + id

	// Check and return error if no user ID provided
	if id == "" {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, nil, total, int(total), "Please provide a valid Id"))
	}

	// Check and return error if user ID not in expected format
	if len(id) != 22 {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, `Id: ["` + id + `"]`, nil, total, int(total), "Incorrect Id format"))
	}

	// Try to find user in database with provided expected user ID
	if err := core.DBConn.First(&users, "id = ?", id).Error; err != nil {

		// Return erorr message if errors occurred
		return c.Status(404).JSON(helpers.ApiResponse(false, query, nil, total, int(total), err.Error()))
	}

	// Set total user found from the previous query
	total = int64(len(users))
	if len(users) == 0 {

		// Set response message for no match record found
		message = "No user match with id [" + id + "]"
	}

	// Return expected response with status "OK"
	return c.Status(200).JSON(helpers.ApiResponse(true, query, users, total, int(total), message))
}

//	NewUser is a function to insert a user record into database
//	@Summary			Create new user
//	@Description		Create new user
//	@Tags				User
//	@Accept				json
//	@Produce			json
//	@Param				user body models.UserRequest true "Create new user"
//	@Success			200 {object} models.ApiResponse{hits=[]models.User}
//	@Failure			500	{object} models.ApiResponse{}
//	@Router				/v1/user/new	[post]
func NewUser(c *fiber.Ctx) error {

	// Define format that accepted in http request
	c.Accepts("application/json")

	// Define which model and table to use in database
	user := new(models.User)

	// Define which model and table to use in database
	userReq := new(models.UserRequest)

	// Define default query message in response
	query := "create-new-user"

	// Define default total in response message
	total := int64(0)

	// Try to get the request body and apply with model
	if err := c.BodyParser(userReq); err != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, nil, total, int(total), err.Error()))
	}
	
	// Try to validate models with pre-defined rules, "required" etc
	if validateViolations := helpers.ValidateStruct(*userReq); validateViolations != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, nil, total, int(total), validateViolations))
	}

	// Assign user request into a newly user model
	user.UserRequest = *userReq

	// Try to insert new user record into database
	created := core.DBConn.Create(&user)
	if created.Error != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, nil, total, int(total), created.Error.Error()))
	}

	// Define total row that got affected by previous query execution, value of 1 will be expected here
	total = int64(created.RowsAffected)

	// Return expected response with status "CREATED"
	return c.Status(201).JSON(helpers.ApiResponse(true, query, user, total, int(total), "User created successfully"))
}

//	PatchUser is a function to update a user record in database that match with provided Id
//	@Summary			Update user details
//	@Description		Update user details
//	@Tags				User
//	@Accept				json
//	@Produce			json
//	@Param				id path string true "User ID"
//	@Param				user body models.UserRequest true "Update user details"
//	@Success			200 {object} models.ApiResponse{hits=[]models.User}
//	@Failure			500	{object} models.ApiResponse{}
//	@Router				/v1/user/{id}	[patch]
func PatchUser(c *fiber.Ctx) error {

	// Define format that accepted in http request
	c.Accepts("application/json")

	// Define default query message in response
	query := "update-current-user"

	// Define default total in response message
	total := int64(0)

	// Try to get the targeted user ID from the URL query
	id := c.Params("id")

	// Check and return error if user ID not in expected format
	if len(id) != 22 {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, `Id: ["` + id + `"]`, nil, total, int(total), "Incorrect Id format"))
	}

	// Define new user request
	request := new(models.UserRequest)


	// Try to get the request body and apply with model
	if err := c.BodyParser(request); err != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, request, total, int(total), err.Error()))
	}

	if validateViolations := helpers.ValidateStruct(*request); validateViolations != nil {

		// Return erorr message if errors occurred
		return c.Status(406).JSON(helpers.ApiResponse(false, query, request, total, int(total), validateViolations))
	}

	// Define which model and table to use in database
	user := new(models.User)

	// Try to find targeted user in database with provided user ID
	if err := core.DBConn.First(&user, "id = ?", id).Error; err != nil {

		// Return erorr message if errors occurred
		return c.Status(404).JSON(helpers.ApiResponse(false, query, request, total, int(total), err.Error()))
	}

	user.UserRequest = *request
	// Try to update specific user with provided data
	patchUser := core.DBConn.Model(&user).Updates(&user)
	if patchUser.Error != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, request, total, int(total), patchUser.Error))
	}

	// Define total row that got affected by previous query execution, value of 1 will be expected here
	total = int64(patchUser.RowsAffected)

	// Return expected response with status "OK"
	return c.Status(200).JSON(helpers.ApiResponse(true, query, request, total, int(total), `User ["` + id + `"] updated successfully`))
}

//	DeleteUser is a function to delete a user record in database that match with provided Id
//	@Summary			Delete user details
//	@Description		Delete user details
//	@Tags				User
//	@Accept				json
//	@Produce			json
//	@Param				id path int true "User ID"
//	@Success			204 {object} models.ApiResponse{}
//	@Failure			500	{object} models.ApiResponse{}
//	@Router				/v1/user/{id}	[delete]
func DeleteUser(c *fiber.Ctx) error {

	// Try to get the targeted user ID from the URL query
	id := c.Params("id")

	// Define default query message in response
	query := `delete-user: ["` + id + `"]`

	// Define default total in response message
	total := int64(0)

	// Check and return error if user ID not in expected format
	if len(id) != 22 {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, `Id: ["` + id + `"]`, nil, total, int(total), "Incorrect Id format"))
	}

	// Define which model and table to use in database
	user := new(models.User)

	// Try to delete specific user with provided user ID
	deleteUser := core.DBConn.Where("id = ?", id).Delete(&user)
	if deleteUser.Error != nil {

		// Return erorr message if errors occurred
		return c.Status(500).JSON(helpers.ApiResponse(false, query, nil, total, int(total), deleteUser.Error))
	}

	// Set "total" value in response message
	total = int64(1)

	// Return expected response with status "NO CONTENT"
	return c.Status(204).JSON(helpers.ApiResponse(true, query, nil, total, int(total), `User ["` + id + `"] has been deleted`))
}