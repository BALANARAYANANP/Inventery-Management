import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { Customer, UpdateCustomer } from "../dto/customerdto";
import bcrypt from 'bcrypt';

@injectable()
export class customerRepository {
    private readonly prisma: PrismaClient;

    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async CreateCustomer(data: Customer) {
        console.log(data)
        try {
            const {name,email,HashingPassword,phone,address} = data
            const saltRound = 10;
            const hashedPassword = await bcrypt.hash(data.HashingPassword, saltRound);
            

            return await this.prisma.customer.create({
                data: {
                    name: data.name,
                    email: data.email,
                    HashingPassword: hashedPassword,
                    phone: data.phone!,
                    address: data.address!
                }
            });
        } catch (err:any) {
            console.log(err.message);
            
            throw new Error("Error occurred while creating customer in Repository");
        }
    }


    async GetAllCustomer(){
        try{
            return await this.prisma.customer.findMany({include : {Purchase : {include : {PurchaseItem: {include:{product: true}}}}} })
        }catch(err){
            throw new Error ("While Get All Customers in Repository")
        }
    }
    async GetSingleCustomer(data:number){
        try{
            const id = data
            return await this.prisma.customer.findUnique ({where: {id : id}, include : {Purchase : {include : {PurchaseItem: {include:{product: true}}}} }})
        }catch(err){
            throw new Error ("While Get A Customer in Repository")
        }
    }
    
    async UpdateCustomer(data: UpdateCustomer, id: number) {
        try {
            const {name,email,HashingPassword,phone,address} = data
            console.log(data)
            const saltRound = 10;
            if(data.HashingPassword){
            const hashedPassword = await bcrypt.hash(data.HashingPassword!, saltRound);
            data.HashingPassword  = hashedPassword
            }
            const Customer = await this.prisma.customer.findUnique ({where: {id : id}})
            if(!Customer)
                throw new Error ("User not Found")
            return await this.prisma.customer.update({ where: {id:id},
                data: {
                    HashingPassword: data.HashingPassword ?? Customer.HashingPassword,
                    name: data.name ?? Customer.name,
                    email: data.email ?? Customer.email,
                    // HashingPassword: hashedPassword,
                    phone: data.phone ?? Customer.phone,
                    address: data.address ?? Customer.address
                }
            });
        } catch (err:any) {
            console.log(err.message);
            
            throw new Error("Error occurred while Updating customer in Repository");
        }
    }
}
