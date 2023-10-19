import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();
class GenerateTokenProvider {

    async execute(userId: string){
        const token = sign({},process.env.JWT_KEY as string,{
            subject:userId,
            expiresIn:"60 minutes"
        })
        return token

    }
 }


 export {GenerateTokenProvider}