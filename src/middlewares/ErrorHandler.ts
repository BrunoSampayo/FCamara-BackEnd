import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
    
    res.status(500).json({ error: 'Algo deu errado:' + err });
};

export default errorHandler;
