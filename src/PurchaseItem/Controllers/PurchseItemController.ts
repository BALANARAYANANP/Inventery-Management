import { Request, Response} from 'express'
import { Container, inject, injectable } from 'inversify';
// import { container } from '../../inversify.config';
import { TYPES } from '../../Types';
import { error } from 'console';
import { PurchaseItemServices } from '../Services/PurchaseItemService';
import { purchase } from '../../Purchase/dto/purchasedto';
import { PurchaseItem } from '../dto/purchaseItem.dto';

@injectable()
export class purchaseItemControllers {


    constructor(@inject(TYPES.purchaseItemServices) private  PurchaseItemService: PurchaseItemServices){}
    createOrder = async (req:Request, res: Response): Promise<void> => {
        try{
            const data:PurchaseItem= req.body
           
            const user = await this.PurchaseItemService.create(data)
            
            res.status(201).json("OrdetItem Created")
            return

        }catch(err:any){
            console.log(err)
            res.status(500).json({error : "Something went Wrong" , err})
        }
    }

    FindAllUsers = async(req:Request, res: Response):Promise<void> => {
        try{
            const AllUsers = await this.PurchaseItemService.getAll()
            res.status(200).json({"All PurchaseItem": AllUsers})
        }catch(err:any){
            res.status(400).send(err.message)
        }
    }

    SingleProductItem = async(req:Request, res: Response):Promise<void> => {
        try{
            const id:number = Number(req.params.id)
            const AllUsers = await this.PurchaseItemService.getOneProuctItem(id)
            res.status(200).json({"Single PurchaseItem": AllUsers})
        }catch(err:any){
            res.status(400).send(err.message)
        }
    }
    // UpdateUser = async(req:Request, res:Response):Promise<void> => {
    //     try{
    //         const data = req.body;
    //         const id = parseInt(req.params.id)
           
            

    //         const userUpdating = await this.userService.UpdateUser(data, id)
    //         res.status(200).json({"User Updated": userUpdating})
    //     }catch(err:any){
    //         res.status(400).send(err.message)
    //     }
    // }

    // DeleteUser = async(req:Request, res: Response):Promise<void> => {
    //     try{
    //         const id:number = parseInt(req.params.id)
    //         const UserDeletion = await this.userService.deleteuser(id)
    //         res.status(200).json("User deleted Sucessfully")
    //     }catch(err:any){
    //         res.status(400).send(err.message)
    //     }
    // }
}