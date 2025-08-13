import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { PurchaseRepository } from "../repository/purchaseRepo";
import { purchase, Updatepurchase } from "../dto/purchasedto";




@injectable()
export class purchaseServices{
    constructor(@inject (TYPES.purchaseRepository) private purchaseRepository : PurchaseRepository){ }

    async createProduct(data:purchase ){
        try{
            return await this.purchaseRepository.CreatePurchase(data)
        }catch(err:any){
            console.log(err.message)
        throw new Error ("Error Occuring While Creating Purchase in Service")
        }
    }

    async findAllPurchase(){
        try{
            return await this.purchaseRepository.GetAllPurchase()
        }catch(err:any){
            throw new Error ("Error Occuring While Getting All Purchase In Service")
        }
    }

    async findOnePurchase(id:number){
        try{
            return await this.purchaseRepository.GetSinglePurchase(id)
        }catch(err:any){
            throw new Error ("Error Occuring While Get One  Purchase In Service")
        }
    }
    async modifyingPurchase(data:Updatepurchase , id: number){
        try{
            return await this.purchaseRepository.UpdatePurchase(data, id)
        }catch(err:any){
            console.log(err.message)
            throw new Error ("Error Occuring While Updating Purchase In Service")
        }
    }
}