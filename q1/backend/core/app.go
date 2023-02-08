package core

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/goccy/go-json"
)

// Function to generate a new App
func NewApp() *fiber.App {

	// Get environment variable
	appName := os.Getenv("APP_NAME")

	// Create new App with custom configurations
	app := fiber.New(fiber.Config{
		AppName: appName,
		CaseSensitive: true,
		StrictRouting: true,
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	// Set the App to adopt CORS
	app.Use(cors.New())

	// Set the App to adopt Recover middleware provided by Fiber
	app.Use(recover.New())

	// Trigger function to start mounting API
	MountLogger(app)

	return app
}