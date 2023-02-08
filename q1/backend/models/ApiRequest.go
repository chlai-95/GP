package models

// Define request model to create and/or edit user
type UserRequest struct {
	Name			string		`validate:"required" gorm:"not null;unique;type:varchar(250);" json:"name"`
	Phone			string		`validate:"required" gorm:"not null;unique;type:varchar(15);" json:"phone"`
	Email			string		`validate:"required,email" gorm:"not null;unique;type:varchar(100);" json:"email"`
	Address_1		string		`validate:"required" gorm:"not null;type:varchar(250);" json:"address_1"`
	Address_2		*string		`json:"address_2"`
	Address_3		*string		`json:"address_3"`
	ProfilePic		*string		`json:"profile_pic"`
}