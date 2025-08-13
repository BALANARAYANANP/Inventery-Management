import { NextFunction, Request, Response } from "express";
import  jwt, { JwtPayload } from "jsonwebtoken";



export const verify = (req:Request,res:Response, next: NextFunction) =>{
    
        const authheaders = req.headers.authorization;
        if(!authheaders){
            res.status(404).json({Eroror : "Token Not Found"})
            return
        }

        const token = authheaders?.split(' ')[1]
        if (!token) {
         res.status(401).json({ error: "Token format is invalid" });
         return
          }
        try{
            const decoded = jwt.verify(token , "SECRETKEY")as JwtPayload;
            next()

    }catch(err){
        res.status(403).json({error : "Invalid Token"})
    }
}