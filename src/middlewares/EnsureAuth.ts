import { Request,Response,NextFunction } from "express";
import passport from '../config/PassportConfig';

export const AuthHandler = (req: Request, res: Response, next: NextFunction)=>{
    passport.authenticate('jwt', {session:false},(err:any,user:any)=>{
        if (err) {
            return next(err);
          }
      
          if (!user) {
            return res.status(401).json({ Error: 'Invalid Token' });
          }
      
          req.user = user;
          next();
    })(req,res,next);
}