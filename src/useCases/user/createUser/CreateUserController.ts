import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";



class CreateUserController {
    async handle(req: Request, res: Response) {
        const {
            name,
            cpf,
            password,
            birthdate,
            address_street,
            address_number,
            address_state,
            administration
        } = req.body;

        const createUserUseCase = new CreateUserUseCase;
        try{
            const newUser = await createUserUseCase.execute({
                name,
                cpf,
                password,
                birthdate,
                address_street,
                address_number,
                address_state,
                administration
            })
            return res.json(newUser)
        }catch(error){
            return res.status(500).json({Error:(error as Error).message})
        }
       
    }

}

export { CreateUserController } 