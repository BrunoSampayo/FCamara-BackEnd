import { prismaClient } from "../../../prisma/Prismaclient";


class RemoveBookUseCase {
    async execute(id: string) {
        if (!id) {
            throw new Error("Invalid id")
        }
        try {
            const DeleteBook = await prismaClient.book.delete({ where: { id: id } })
            return ({Deleted_Book: `${DeleteBook.title}`})
        } catch (err) {
            throw new Error("Delete error: " + (err as Error).message);
        }
    }
}


export { RemoveBookUseCase }