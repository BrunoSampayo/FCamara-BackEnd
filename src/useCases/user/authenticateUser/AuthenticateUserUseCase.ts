
import { prismaClient } from "../../../prisma/Prismaclient";
import { compare } from "bcryptjs";
import { GenerateTokenProvider } from "../../../providers/GenerateTokenProvider";
type AutheticateData ={
    cpf:string,
    password:string,
}


class AuthenticateUserUseCase {
    async execute(Data:AutheticateData){
        if(!Data.cpf || !Data.password){
            throw new Error("Invalid credentials")
        }
        const haveUser = await prismaClient.user.findFirst({
            where:{
                cpf: Data.cpf
            }
        })
        if(!haveUser){
            throw new Error("Not user found or invalid password, check your credentials with administration")
        }
        const validPassowd  = await compare(Data.password,haveUser.password_hash)
        if(!validPassowd){
            throw new Error("Not user found or invalid password, check your credentials with administration") 
        }
        if(validPassowd){
            const generateTokenProvider = new GenerateTokenProvider();
            const token = await generateTokenProvider.execute(haveUser.id);
            return {token}
        }
    }
}


export {AuthenticateUserUseCase} 