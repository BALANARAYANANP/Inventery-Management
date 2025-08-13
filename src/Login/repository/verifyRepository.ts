import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import { Login } from "../dto/verificatio.dto";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@injectable()
export class LoginRepository {
    private readonly prisma: PrismaClient;

    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async CreateLogin(data:Login) {
        try {
           

            const CheckConsumer = await this.prisma.customer.findUnique({where : {email:data.email}})

            if(!CheckConsumer)
                throw new Error ("Consumer was Not Found")

            const isMatch  =  await bcrypt.compare(data.password, CheckConsumer.HashingPassword)

            if(isMatch)
                return  jwt.sign({email : data.email} , "SECRETKEY" , {expiresIn: '1h'})
            
            
        } catch (err:any) {
            console.log(err.message);
            
            throw new Error("Error occurred while Consumer Logging in Repository");
        }
    }

}