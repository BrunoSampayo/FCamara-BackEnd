import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { cpf, password } = req.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase;
        try{
            const Auth = await authenticateUserUseCase.execute({ cpf, password })
            return res.json(Auth)

        }catch(error){
            console.log((error as Error).message);
            return res.json({Error:(error as Error).message})
        }
        

    }
}

export { AuthenticateUserController } 