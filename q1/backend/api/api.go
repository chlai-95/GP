package api

import (
	"q1_backend/api/v1"
	_ "q1_backend/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

// Function to mounting diferrent API versioning routes
func mountVersion(grouped_api fiber.Router, ver string, callback func(fiber.Router)) {

	// Define current version tag, this will be part of the request URL
	// Example: example.com/api/{versioning_tag}
	versioning_tag := "/" + ver

	// Mounting and grouping defined versioning tag into the API group
	versioned_api := grouped_api.Group(versioning_tag, func(c *fiber.Ctx) error {

		// Setting up version
		c.Set("Version", ver)

		// Exit callback and continue
		return c.Next()
	})

	// Execute custom callback provided
	callback(versioned_api)
}

// Private function to mount the Swagger page routes
func mountDocs(app *fiber.App) {
	app.Get("/docs/*", swagger.HandlerDefault)
}

// Function to mounting an API group in the main App
func MountApi(app *fiber.App) {

	// Create new API group, this will be part of the request URL
	// Example: example.com/{api}
	api := app.Group("/api")

	// Execute function to mounting defined versioning and trigger custom callback
	mountVersion(api, "v1", func(versioned_api fiber.Router) {

		// Run MountRouter function in the "V1" package
		v1.MountRouter(versioned_api)
	})

	// Mounting the Swagger page routes
	mountDocs(app)
}