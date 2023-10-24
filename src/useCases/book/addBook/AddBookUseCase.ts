import { prismaClient } from "../../../prisma/Prismaclient"
type DataType = {
    title: string,
    author: string,
    ISNB: string
}

class AddBookUseCase {
    async execute(Data: DataType) {
        for (let [key, value] of Object.entries(Data)) {
            if (value === undefined || value.length < 1) {
                throw new Error(key + ':' + "is Missing")
            }
        }
        try{
            const newBook = await prismaClient.book.create({
                data:{
                    title:Data.title,
                    author:Data.author,
                    ISBN:Data.ISNB,
                    image_url:'teste'
                }
                
            })
            return newBook
        }
        catch(err){
            throw new Error("Creation error: " + (err as Error).message);
        }
        
    }
}

export { AddBookUseCase }