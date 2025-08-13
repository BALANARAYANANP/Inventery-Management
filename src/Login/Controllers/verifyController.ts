import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import {Request, Response} from 'express'
import { LoginServices } from "../Services/verifyServices";
import { Login } from "../dto/verificatio.dto";


@injectable()
 
export class LoginControllers {
    constructor(@inject (TYPES.LoginServices) private Login : LoginServices){ }

    createPurchase = async(req: Request , res:Response): Promise<void> =>{
        try {
            const data: Login = req.body
            const newLogin= await this.Login.createLogging(data)
            res.status(201).json({"Login Sucessfully": newLogin})
            return
        } catch (err:any) {
            res.status(400).json({"Error" : err.message })
        }
    }
}