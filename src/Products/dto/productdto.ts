export interface Product {
    name : string
    description : string
    category : string
    price : string
    stockQuantity: number
}


export interface UpdateProduct {
    name? : string
    description? : string
    category? : string
    price? : string
    stockQuantity?: number
}