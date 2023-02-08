package core

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func MountLogger(app *fiber.App) {

	// Get current time
	currentTime := time.Now()

	// Get current date from currentTime
	currentDate := currentTime.Format("2006-01-02")

	// Define targeted log file, new log file will be create if not exist
	log_file, err := os.OpenFile("./core/logs/"+currentDate+".json", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {

		// Use golang log to handle unable to create custom log file
		log.Fatalf("error opening file: %v", err)
	}

	// Define new App logger with custom configurations
	loggerConfig := logger.Config{
		Format:		`{"time": "${time}", "status": "${status}", "method": "${method}", "path": "${path}", "header": "${reqHeaders}"},`+"\n",
		TimeZone:	"Asia/KualaLumpur",
		Output: 	log_file,
	}
	
	// mount the new App logger to App
	app.Use(logger.New(loggerConfig))
}