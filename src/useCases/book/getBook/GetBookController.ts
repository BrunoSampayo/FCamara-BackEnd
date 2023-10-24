import { Request, Response } from "express";
import { GetBooksUseCase } from "./GetBookUSeCase";



class GetBookController {
    async handle(req: Request, res: Response) {
         const { author, ISNB, title } = req.query
        
         const validAuthor = typeof author === 'string' ? author : undefined;
         const validISNB = typeof ISNB === 'string' ? ISNB : undefined;
         const validTitle = typeof title === 'string' ? title : undefined;
        try {
             const getBooks =new GetBooksUseCase;
             const books = await getBooks.handle({validAuthor,validISNB,validTitle})
            
            return res.json(books)
        } catch (err) {
            return res.status(400).json({ Error: (err as Error).message });
        }
    }
}


export { GetBookController }