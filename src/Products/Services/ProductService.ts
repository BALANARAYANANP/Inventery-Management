import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { productRepository } from "../ProductReposity/ProductRepository";
import { Product, UpdateProduct } from "../dto/productdto";




@injectable()
export class ProductServices{
    constructor(@inject (TYPES.productRepository) private productRepository : productRepository){ }

    async createProduct(data:  Product){
        try{
            return await this.productRepository.CreateProduct(data)
        }catch(err:any){
            console.log(err.message)
        throw new Error ("Error Occuring While Creating Product in Service")
        }
    }

    async findAllProducts(){
        try{
            return await this.productRepository.GetAllProduct()
        }catch(err:any){
            throw new Error ("Error Occuring While Getting All Products In Service")
        }
    }

    async findSingleProducts(id:number){
        try{
            return await this.productRepository.GetSingleProduct(id)
        }catch(err:any){
            throw new Error ("Error Occuring While Getting Single Product In Service")
        }
    }

    async ModifyingProducts(data:UpdateProduct, id:number){
        try{
            return await this.productRepository.UpdateProduct(data, id)
        }catch(err:any){
            throw new Error ("Error Occuring While Updating Products In Service")
        }
    }
}