import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { LoginRepository } from "../repository/verifyRepository";
import { Login } from "../dto/verificatio.dto";



@injectable()
export class LoginServices{
    constructor(@inject (TYPES.LoginRepository) private  LoginRepository: LoginRepository){ }

    async createLogging(data:Login){
        try{
            return await this.LoginRepository.CreateLogin(data)
        }catch(err:any){
            console.log(err.message)
        throw new Error ("Error Occuring Login Customer in Service")
        }
    }

}