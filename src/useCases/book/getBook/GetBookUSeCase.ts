import { prismaClient } from "../../../prisma/Prismaclient";

type ParamsType = {
    validAuthor?: string,
    validISNB?: string,
    validTitle?: string
}

class GetBooksUseCase {
    async handle(Params: ParamsType) {

        try {
            const books = prismaClient.book.findMany({
                where: {
                    title: {
                        contains: Params.validTitle,
                        mode:"insensitive"
                    },
                    ISBN: {
                        contains: Params.validISNB,
                        mode:"insensitive"
                    },
                    author: {
                        contains: Params.validAuthor,
                        mode:"insensitive"
                    }

                }
            })
            return books
        } catch (err) {
            throw new Error("Delete error: " + (err as Error).message);
        }




    }
}
export { GetBooksUseCase }