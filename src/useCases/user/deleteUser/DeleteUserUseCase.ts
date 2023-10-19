import { prismaClient } from "../../../prisma/Prismaclient"
import { checkValidCPF } from "../../../validators/CPFValidator"


class DeleteUserUseCase {
    async execute(userId: string) {

        console.log(userId)
        if (!userId) {
            throw new Error("Data missing")
        }

        const userExists = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!userExists) {
            throw new Error("User not found");
        }

        try{
            await prismaClient.user.delete({
                where: {
                    id: userId
                }
            })
            return ({User_Deleted: userExists})
        }catch(error){
            throw new Error("User delete error" + (error as Error).message)
        }
       
    }
}


export { DeleteUserUseCase }