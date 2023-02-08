package helpers

import (
	"gopkg.in/go-playground/validator.v9"
)

// Define the error response model
type ErrorResponse struct {
	FailedField		string
	Tag				string
	Value			string
}

// Function to validate provided data is fulfill all the rules
func ValidateStruct(data interface{}) []*ErrorResponse {

	// Define which model to use
	var errors []*ErrorResponse

	// Initiate a new validator
	validate := validator.New()

	// Start validate the provided data with Struct
	err := validate.Struct(data)
	if err != nil {

		// Generating return message if hit violation
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	// return all the violations message (if any)
	return errors
}