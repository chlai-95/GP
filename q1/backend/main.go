package main

import (
	"log"

	core "q1_backend/core"
	api "q1_backend/api"
)

//	@title			CHLai - Developer Testing Q1
//	@version		1.0.0
//	@description	Backend Service for GP Developer Testing - Q1

//	@contact.name	CH Lai
//	@contact.email	cheehoong1995@gmail.com

//	@BasePath		/api
func main() {

	// Trying to connect to program database
	core.ConnectDB()

	// Trying to generate a new App
	app := core.NewApp()
	
	// Trying to mount all the corresponding API groups and routes
	api.MountApi(app)

	// Trying to serve up the API App with provided port
	// Error will be log out using golang log package if error occurred
	log.Fatal(app.Listen(":9000"))
}