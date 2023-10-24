import { Request, Response } from "express";
import { AddBookUseCase } from "./AddBookUseCase";

class AddBookController {
    async handle(req: Request, res: Response) {
        const { title, author, ISNB } = req.body;
        const image = req.file


        try {
            const addBookuseCase = new AddBookUseCase;
            const book = await addBookuseCase.execute({ title, author, ISNB }, image)
            return res.json(book);
        } catch (err) {
            return res.status(400).json({ Error: (err as Error).message });
        }
    }
}


export { AddBookController }