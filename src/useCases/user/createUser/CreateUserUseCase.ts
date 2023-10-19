import { prismaClient } from "../../../prisma/Prismaclient";
import { hash } from "bcryptjs";
import { checkValidCPF } from "../../../validators/CPFValidator";
interface UserData {
    name: string,
    cpf: string,
    password: string,
    birthdate: string,
    address_street: string,
    address_number: string,
    address_state: string,
    administration?:string |boolean,
}

class CreateUserUseCase {
    private requiredFields: (keyof UserData)[] = [
        'name',
        'cpf',
        'password',
        'birthdate',
        'address_street',
        'address_number',
        'address_state',
    ];

    private checkRequiredFields(userData: UserData) {
        return this.requiredFields.filter((field) => !userData[field]);
    }

    

    async execute(userData: UserData) {
        const missingFields = this.checkRequiredFields(userData)

        if (missingFields.length > 0) {
            throw new Error(  `Missing required fields: ${missingFields.join(', ')}` );
        }
        const CPFisReal = checkValidCPF(userData.cpf);

        if (!CPFisReal) {
            throw new Error("Invalid CPF")
        }

        const userAlreadyExist = await prismaClient.user.findFirst(
            {
                where: {
                    cpf: userData.cpf
                }
            }
        )
        if (userAlreadyExist) {
            throw new Error ("CPF already exists")
        }

        if(userData.administration){
            userData.administration=true;
        }
        const fomatedData =new Date(userData.birthdate)
        const hashPassword = await hash(userData.password,8)
        const formatedCPF = userData.cpf.replace(/[^\d]/g, '');
        const user = await prismaClient.user.create({
            data:{
                name:userData.name,
                cpf:formatedCPF,
                password_hash: hashPassword,
                birthday:fomatedData,
                address_street:userData.address_street,
                address_number:userData.address_number,
                address_state:userData.address_state,
                administration:userData.administration as boolean
            }
        })
        return {user}

    }


}

export { CreateUserUseCase }