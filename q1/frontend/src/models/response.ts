// Define api response metadata models
export interface IApiResponseMetadata {
    success: boolean,
    message: any,
    count: number,
    total: number,
    query: any,
}

// Define api response models
export interface IApiResponse {
    hits: Array<any>,
    metadata: IApiResponseMetadata
}