
import { Prisma, User } from "@prisma/client"
import { prismaClient } from "../../../prisma/Prismaclient"
import { use } from "passport";
import { hash } from "bcryptjs";
import { checkValidCPF } from "../../../validators/CPFValidator";


type DataType = {
    name: string;
    cpf: string;
    password: string;
    birthdate: any;
    address_street: string;
    address_number: string;
    address_state: string;
    administration: string;
}
class EditUserUSeCase {
    async execute(id: string, Data: DataType) {
        let userToEdit = await prismaClient.user.findFirst({ where: { id: id } },)
        if (userToEdit) {
            for (let [key, value] of Object.entries(Data)) {
                console.log(Data)
                if (value !== undefined) {
                    if ((value).length >= 1) {
                        switch (key) {
                            case 'name':
                                userToEdit.name = value
                                break;
                            case 'cpf':
                                if (!checkValidCPF(value)) throw new Error("Invalid CPF")
                                value = value.replace(/[^\d]/g, '');
                                userToEdit.cpf = value
                                break;
                            case 'password':
                                value = await hash(value, 8)
                                userToEdit.password_hash = value;
                                break;
                            case 'birthdate':
                                value = new Date(value)
                                userToEdit.birthday = value
                                break;
                            case 'address_street':
                                userToEdit.address_street = value
                                break;
                            case 'address_number':
                                userToEdit.address_number = value
                                break;
                            case 'address_state':
                                userToEdit.address_state = value;
                                break;
                            case 'administration':
                                value === "true" ? value = true : value = false
                                userToEdit.administration = value
                                break;
                        }

                    }
                }
            }
            try {
                await prismaClient.user.update({
                    where: { id: id },
                    data: userToEdit
                }
                )
            } catch (err) {
                throw new Error("Error to update User: " + (err as Error).message)
            }
        }

        return userToEdit




    }
}


export { EditUserUSeCase }