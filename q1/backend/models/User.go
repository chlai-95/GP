package models

import (
	"gorm.io/gorm"
	"github.com/lithammer/shortuuid/v4"
)

// Define user model
type User struct {
	ID				string			`gorm:"primaryKey"`
	UserRequest	 					`gorm:"embedded"`

	gorm.Model
}

// Generate random shortUUID everytime trying to create a new user record into database
func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.ID = shortuuid.New()
	return
}