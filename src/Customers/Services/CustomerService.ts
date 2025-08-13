import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { customerRepository } from "../repository/customerRepository";
import { Customer, UpdateCustomer } from "../dto/customerdto";



@injectable()
export class customerServices{
    constructor(@inject (TYPES.customerRepository) private customerRepository : customerRepository){ }

    async createCustomer(data: Customer){
        try{
            return await this.customerRepository.CreateCustomer(data)
        }catch(err:any){
            console.log(err.message)
        throw new Error ("Error Occuring While Creating Customer in Service")
        }
    }

    async findAllCustomers(){
        try{
            return await this.customerRepository.GetAllCustomer()
        }catch(err:any){
            throw new Error ("Error Occuring While Getting All Customer IN Service")
        }
    }

    async findOneCustomers(data:number){
        try{
            return await this.customerRepository.GetSingleCustomer(data)
        }catch(err:any){
            console.log(err)
            throw new Error ("Error Occuring While Getting Single Customer In Service")
        }
    }

    async MofifyCustomer(data:UpdateCustomer, id:number){
        try{
            return await this.customerRepository.UpdateCustomer(data,id)
        }catch(err:any){
            console.log(err)
            throw new Error ("Error Occuring While Getting Updating Customer In Service")
        }
    }
}