import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";


class GetUserController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        try {
            const getUserUseCase = new GetUserUseCase;

            const users = await getUserUseCase.execute(name);

            return res.json(users);
        } catch (err) {
            return res.status(500).json({ Error: (err as Error).message })
        }

    }
}

export { GetUserController }