// Define search query model
export interface ISearchQuery {
    limit: number,
    skip: number,
    order_by?: string,
    sort_order?: string
}