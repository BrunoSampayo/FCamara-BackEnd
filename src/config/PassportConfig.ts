import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { prismaClient } from '../prisma/Prismaclient';
import dotenv from 'dotenv';
import { User } from '@prisma/client';

dotenv.config()


const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string,
}

passport.use(new JWTStrategy(options, async (jwt_payload, done) => {
    try {
        const userData = await prismaClient.user.findFirst({
            where: {
                id: jwt_payload.sub,
            }
        })
        if(userData ){
            
            const {password_hash,address_number,address_state,address_street,birthday,...user}:Partial<User>=userData;
            return done(null, user);
        }
        return done(null, false);
        
    }catch(error){
        return done(error, false);
    }
    
   
}))

export default passport