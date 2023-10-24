import path from "path"
import { UploadOneFile } from "../../../helpers/UploadOneFile"
import { prismaClient } from "../../../prisma/Prismaclient"

type DataType = {
    title: string,
    author: string,
    ISNB: string
}

class AddBookUseCase {
    async execute(Data: DataType, image: Express.Multer.File | undefined) {

        for (let [key, value] of Object.entries(Data)) {
            if (value === undefined || value.length < 1) {
                throw new Error(key + ':' + "is Missing")
            }
        }
        let image_url: string
        if (image) {
            const uploadImage = new UploadOneFile;
            image_url = await uploadImage.execute(image, './public/images/books/')
        } else {
            image_url = 'default-image.jpg'
        }

        try {
            const newBook = await prismaClient.book.create({
                data: {
                    title: Data.title,
                    author: Data.author,
                    ISBN: Data.ISNB,
                    image_url: image_url
                }

            })
            return newBook
        }
        catch (err) {
            throw new Error("Creation error: " + (err as Error).message);
        }

    }
}

export { AddBookUseCase }