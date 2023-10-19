import { User } from '@prisma/client';
import { prismaClient } from "../../../prisma/Prismaclient"




class GetUserUseCase {
    async execute(name: string) {


        try {
            const users = await prismaClient.user.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }

                }
            })

            if (users.length <= 0) throw new Error("No user found")
            const usersToReturn: Partial<User>[] = []
            for (let i in users) {
                const { password_hash, address_number, address_state, address_street, birthday, ...userTrated } = users[i]
                usersToReturn.push(userTrated)
            }
            return usersToReturn


        } catch (err) {
            throw new Error((err as Error).message)
        }
    }
}

export { GetUserUseCase }