package helpers

import (
	"q1_backend/models"
)

// Generate new response with correct models, format and data
func ApiResponse(isSuccess bool, query any, hits any, total int64, count int, message any) models.ApiResponse {
	metadata := models.RequestMetadata{
		Query:		query,
		Success:	isSuccess,
		Total:		total,
		Count:		int(total),
		Message:	message,
	}

	response := models.ApiResponse{
		Hits:		hits,
		Metadata:	metadata,
	}

	return response
}