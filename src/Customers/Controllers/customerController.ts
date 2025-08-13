import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { customerServices } from "../Services/CustomerService";
import {Request, Response} from 'express'
import { Customer, UpdateCustomer } from "../dto/customerdto";


@injectable()
 
export class customerControllers {
    constructor(@inject (TYPES.customerServices) private customerService : customerServices){ }

    createCustomer = async(req: Request , res:Response): Promise<void> =>{
        try {
            const data: Customer = req.body
            const newCustomer = await this.customerService.createCustomer(data)
            res.status(201).json({"User Created Sucessfully": newCustomer})
            return
        } catch (err:any) {
            res.status(400).json({"Error" : err.message })
        }
    }


    getAllCustomers = async(req:Request, res: Response): Promise<void> => {
        try{
            const AllCustomers = await this.customerService.findAllCustomers()
            res.status(200).json({"All Users" : AllCustomers })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }


    SingleCustomer = async(req:Request, res: Response): Promise<void> => {
        try{
            const data:number = Number(req.params.id)
            const SingleCustomers = await this.customerService.findOneCustomers(data)
            res.status(200).json({"Single Users" : SingleCustomers })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }

    UpdatingCustomer = async(req:Request, res: Response): Promise<void> => {
        try{
            const id:number = Number(req.params.id)
            const data:UpdateCustomer = req.body
            const SingleCustomers = await this.customerService.MofifyCustomer(data, id)
            res.status(200).json({"Customer Updated" : SingleCustomers })
        }catch(err:any){
            res.status(400).json({Error: err.message})
        }
    }
}