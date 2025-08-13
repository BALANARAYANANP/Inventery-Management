import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { purchase, Updatepurchase } from "../dto/purchasedto";

@injectable()
export class PurchaseRepository {
    private readonly prisma: PrismaClient;

    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async CreatePurchase(data:purchase) {
        try {
            const {customerId} = data

            const user = await this.prisma.customer.findUnique({where : {id: customerId}})
            if(user){
            
            return await this.prisma.purchase.create({
                data: {
                    customerId: data.customerId,
                    totalAmount: data.totalAmount!,
                    Status: data.Status!
                   
                }
            });
        }
        else{
            throw new Error ("User not Found")
            return
        }
        } catch (err:any) {
            console.log(err.message);
            
            throw new Error("Error occurred while creating Purchase in Repository");
        }
    }


    async GetAllPurchase(){
        try{
            return await this.prisma.purchase.findMany({include : {customer: true , PurchaseItem: {include : {product: true}}}})
        }catch(err){
            throw new Error ("While Get All Purchase in Repository")
        }
    }

    async GetSinglePurchase(id:number ){
        try{
            return await this.prisma.purchase.findUnique({where : {id:id} ,  include : {customer: true }})
        }catch(err){
            throw new Error ("While Get Single Purchase in Repository")
        }
    }

    async UpdatePurchase(data:Updatepurchase , id :number){
        try{

            
            const purchase = await this.prisma.purchase.findUnique({where:{id:id}})
          
            
            if(!purchase) {

                throw new Error ("Purchase Not Found")
            }
            return await this.prisma.purchase.update({ where: {id:id},
                data: {
                  totalAmount: data.totalAmount ?? purchase.totalAmount,
                  Status: data.Status ?? purchase.Status

                }
            });
        }
        catch(err:any){
            console.log(err)
             throw new Error ("Error Occured While Updating Purchase Repository")
    }
    }
}
