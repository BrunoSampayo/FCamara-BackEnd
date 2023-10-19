import { Router } from "express";
import { CreateUserController } from "../useCases/user/createUser/CreateUserController";
import { AuthenticateUserController } from "../useCases/user/authenticateUser/AuthenticateUserController";

export const router= Router();

const createUserControler= new CreateUserController;
const authenticateUserController= new AuthenticateUserController;
router.get('/ping', (req, res) => {res.json({pong:true})})
router.post('/user',createUserControler.handle);
router.post('/login', authenticateUserController.handle )
router.get("/teste", (req, res) => {throw new Error("Teste")})