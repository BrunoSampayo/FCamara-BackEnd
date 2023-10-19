import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv'
import { router } from "./routes/Routes";
import "express-async-errors"
import  errorHandler  from "./middlewares/ErrorHandler";
dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.urlencoded({extended:true}));


app.use(router);
app.use(errorHandler);

app.use((req:Request,res:Response)=>{
    res.status(404)
    res.json({error:'EndPoint nao encontrado'})
});

app.listen(process.env.PORT, ()=>console.log('listening on port 3000'))