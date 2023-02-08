package models

// Define search query model ( uses as request and response )
type SearchQueries struct {
	Limit				int					`query:"limit",json:"limit"`
	Skip 				int 				`query:"skip",json:"skip"`
	OrderBy				string				`query:"order_by",json:"order_by"`
	SortOrder			string				`query:"sort_order",json:"sort_order"`
}

// Define request metadata model
type RequestMetadata struct {
	Success				bool				`json:"success"`
	Message				any					`json:"message"`
	Count				int					`json:"count"`
	Total				int64				`json:"total"`
	Query				any					`json:"query"`
}

// Define response model
type ApiResponse struct {
	Hits				any					`json:"hits"`
	Metadata			RequestMetadata		`json:"metadata"`
}