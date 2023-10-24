import { Request,Response } from "express";
import { AddBookUseCase } from "./AddBookUseCase";

class AddBookController {
    async handle(req:Request, res:Response){
        const {title,author,ISNB} = req.body;
        const image = req.file
        console.log(image)

        try{
            const addBookuseCase = new AddBookUseCase;
            const book = await addBookuseCase.execute({title,author,ISNB})
            return res.json(book);
        }catch(err){
            return res.status(400).json({Error: (err as Error).message});
        }
    }
}


export {AddBookController}