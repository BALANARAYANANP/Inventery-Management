import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import {Request, Response} from 'express'
import { purchaseServices } from "../Services/purchaseService";
import { purchase, Updatepurchase } from "../dto/purchasedto";


@injectable()
 
export class purchaseControllers {
    constructor(@inject (TYPES.purchaseServices) private purchaseService : purchaseServices){ }

    createPurchase = async(req: Request , res:Response): Promise<void> =>{
        try {
            const data: purchase = req.body
            const newPurchase = await this.purchaseService.createProduct(data)
            res.status(201).json({"Purchase Created Sucessfully": newPurchase})
            return
        } catch (err:any) {
            res.status(400).json({"Error" : err.message })
        }
    }


    getAllPurchase = async(req:Request, res: Response): Promise<void> => {
        try{
            const AllPurchases = await this.purchaseService.findAllPurchase()
            res.status(200).json({"All Purchases" : AllPurchases })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }

    SinglePurchase = async(req:Request, res: Response): Promise<void> => {
        try{
            const id:number = Number(req.params.id)
            const SinglePurchases = await this.purchaseService.findOnePurchase(id)
            res.status(200).json({"All Purchases" : SinglePurchases })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }


    UpdateOnePurchase = async(req:Request, res: Response): Promise<void> => {
        try{
            const data:Updatepurchase = req.body
            const id:number = Number(req.params.id)
            const UpdatePurchases = await this.purchaseService.modifyingPurchase(data,id)
            res.status(200).json({"Updated Purchases" : UpdatePurchases })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }
}