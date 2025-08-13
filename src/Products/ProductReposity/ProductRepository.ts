import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { Product, UpdateProduct } from "../dto/productdto";

@injectable()
export class productRepository {
    private readonly prisma: PrismaClient;

    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async CreateProduct(data: Product) {
        try {
            const {name,description,category,price,stockQuantity} = data
            
            return await this.prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    price: data.price,
                    stockQuantity: data.stockQuantity
                }
            });
        } catch (err:any) {
            console.log(err.message);
            
            throw new Error("Error occurred while creating Product in Repository");
        }
    }


    async GetAllProduct(){
        try{
            return await this.prisma.product.findMany({include: {PurchaseItem : {include : {purchase : {include: {customer: true}}}}}})
        }catch(err){
            throw new Error ("While Get All Product in Repository")
        }
    }

    async GetSingleProduct(id:number){
        try{
            
            return await this.prisma.product.findUnique( {where : {id: id}, include: {PurchaseItem : {include : {purchase : {include: {customer: true}}}}}})
        }catch(err){
            throw new Error (" Error Occured While Get Single Product in Repository")
        }
    }

    async UpdateProduct(data:UpdateProduct , id :number){
        try{
            const product = await this.prisma.product.findUnique({where: {id:id}})
            if(!product)
                throw new Error ("Product Not Found")
            return await this.prisma.product.update({ where: {id:id},
                data: {
                  name: data.name ?? product.name,
                  description: data.description ?? product.description,
                  category: data.category?? product.category,
                  price: data.price ?? product.price,
                  stockQuantity: data.stockQuantity ?? product.stockQuantity

                }
            });
        }
        catch(err){
             throw new Error ("Error Occured While Updating Product Repository")
    }
    }
}
