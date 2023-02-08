package helpers

import (
	"os"
)

// Check if environment variable exist, assign to default value when not exist
func GetEnv(key, fallback string) string {
    if value, ok := os.LookupEnv(key); ok {
        return value
    }
    return fallback
}