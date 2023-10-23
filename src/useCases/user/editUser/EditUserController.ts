import { User } from "@prisma/client";
import { Request,Response } from "express";
import { EditUserUSeCase } from "./EditUserUseCase";

class EditUserController {
    async handle(req: Request, res: Response){
        const {id} = req.params;
        const {name,cpf,password,birthdate,address_street,address_number,address_state,administration} = req.body
        

        try{
            const editUserUSeCase = new EditUserUSeCase();
            const editUser = await editUserUSeCase.execute(id,{name,cpf,password,birthdate,address_street,address_number,address_state,administration});
            return res.json(editUser)

        }
        catch(err){
            res.status(404).json({Error:`${(err as Error).name}: ${(err as Error).message}`});
        }

        
        
    }
}

export {EditUserController};