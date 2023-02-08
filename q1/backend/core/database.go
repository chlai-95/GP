package core

import (
	"log"
	"os"

	"q1_backend/models"
	"q1_backend/helpers"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Define new database variable
var (
	DBConn *gorm.DB
)

func ConnectDB() {

	log.Println("Trying to connect to MySQL...")
	
	// Get environment variable
	username := helpers.GetEnv("DB_USERNAME", "root")
	password := helpers.GetEnv("DB_PASSWORD", "password")
	dbHost := helpers.GetEnv("DB_HOST", "localhost")
	dbPort := helpers.GetEnv("DB_PORT", "3306")
	database := helpers.GetEnv("DB", "q1_backend")

	// Generate connection string
	dsn := username + ":" + password + `@tcp(` + dbHost + `:` + dbPort + `)/` + database + `?charset=utf8mb4&parseTime=True&loc=Local`

	// Trying to connect to targeted database by using defined connection string
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		// Writing errors into logs and exit program
		log.Fatal("Failed to connect to database. \n", err)
		os.Exit(2)
	}

	// Log connection status
	log.Println("Connected")

	// Log start migration
	log.Println("Starting migration...")

	// Trigger migration task
	db.AutoMigrate(&models.User{})

	// Log status of migration
	log.Println("Done migrated.")

	DBConn = db
}