import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import {Request, Response} from 'express'
// import { productServices } from "../Services/ProductService";
import { Product, UpdateProduct } from "../dto/productdto";
import { ProductServices } from "../Services/ProductService";


@injectable()
 
export class productControllers {
    constructor(@inject (TYPES.productServices) private productService : ProductServices){ }

    createProduct = async(req: Request , res:Response): Promise<void> =>{
        try {
            const data: Product = req.body
            const newProuct = await this.productService.createProduct(data)
            res.status(201).json({"Product Created Sucessfully": newProuct})
            return
        } catch (err:any) {
            res.status(400).json({"Error" : err.message })
        }
    }


    getAllProducts = async(req:Request, res: Response): Promise<void> => {
        try{
            const AllCustomers = await this.productService.findAllProducts()
            res.status(200).json({"All Users" : AllCustomers })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }
    getOneProducts = async(req:Request, res: Response): Promise<void> => {
        try{
            const id:number = Number(req.params.id)
            const AllCustomers = await this.productService.findSingleProducts(id)
            res.status(200).json({"Single Users" : AllCustomers })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }

    
    UpdateSingleProducts = async(req:Request, res: Response): Promise<void> => {
        try{
            const data:UpdateProduct = req.body
            const id = Number(req.params.id)
            const UpdatedCustomers = await this.productService.ModifyingProducts(data,id )
            res.status(200).json({"Product Updated" : UpdatedCustomers })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }
}