import { User } from '@prisma/client'
import {Request,Response, NextFunction} from 'express'


export const EnsureAsAdmin = (req:Request,res:Response,next:NextFunction) => {
        const user = req.user as Partial<User>
        
        if(user.administration){
            next()
        }else{
            return res.status(401).json({Error:"Not Authorized"})
        }

        
        
    
}