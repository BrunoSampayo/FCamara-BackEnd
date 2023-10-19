import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";



class DeleteUserController {
    async handle (req:Request,res:Response){
        const {id} = req.body;

        const deleteUserUseCase = new DeleteUserUseCase;

        try{
            const deletetUser = await deleteUserUseCase.execute(id)
            return res.status(200).json(deletetUser);
        }catch(error){
            return res.status(500).json({Error:(error as Error).message})
        }

    }
}


export {DeleteUserController};