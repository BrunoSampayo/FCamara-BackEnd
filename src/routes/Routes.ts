import { Router } from "express";
import { CreateUserController } from "../useCases/user/createUser/CreateUserController";
import { AuthenticateUserController } from "../useCases/user/authenticateUser/AuthenticateUserController";
import { DeleteUserController } from "../useCases/user/deleteUser/DeleteUserController";
import { AuthHandler } from "../middlewares/EnsureAuth";
import { EnsureAsAdmin } from "../middlewares/EnsureAsAdminstrator";
export const router = Router();

const createUserControler = new CreateUserController;
const authenticateUserController = new AuthenticateUserController;
const deleteUserController = new DeleteUserController;


router.get('/ping', (req, res) => { res.json({ pong: true }) });
router.post('/user',AuthHandler,EnsureAsAdmin, createUserControler.handle);
router.post('/login', authenticateUserController.handle);
router.delete('/user', AuthHandler,EnsureAsAdmin,deleteUserController.handle);
