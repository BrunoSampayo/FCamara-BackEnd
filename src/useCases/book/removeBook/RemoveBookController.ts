import { Request, Response } from "express";
import { RemoveBookUseCase } from "./RemoveBookUseCase";


class RemoveBookController {
    async handle(req: Request, res: Response) {
        const { id } = req.body

        try {
         const removeBookUseCase = new RemoveBookUseCase;
         const removeBook = await removeBookUseCase.execute(id)
         res.json(removeBook);
        } catch (err) {
            return res.status(400).json({ Error: (err as Error).message });
        }
    }
}


export { RemoveBookController  }