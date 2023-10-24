import { Router } from "express";

import { CreateUserController } from "../useCases/user/createUser/CreateUserController";
import { AuthenticateUserController } from "../useCases/user/authenticateUser/AuthenticateUserController";
import { DeleteUserController } from "../useCases/user/deleteUser/DeleteUserController";
import { GetUserController } from "../useCases/user/getUser/GetUserController";
import { EditUserController } from "../useCases/user/editUser/EditUserController";

import { AuthHandler } from "../middlewares/EnsureAuth";
import { EnsureAsAdmin } from "../middlewares/EnsureAsAdminstrator";
import { AddBookController } from "../useCases/book/addBook/AddBookController";
import uploadconfig from "../config/multerConfig";
import { RemoveBookController } from "../useCases/book/removeBook/RemoveBookController";

export const router = Router();

const createUserControler = new CreateUserController;
const authenticateUserController = new AuthenticateUserController;
const deleteUserController = new DeleteUserController;
const getUserController = new GetUserController;
const editUserController = new EditUserController;

const addBookController = new AddBookController;
const removeBookController = new RemoveBookController;


router.get('/ping', (req, res) => { res.json({ pong: true }) });

router.post('/user', AuthHandler, EnsureAsAdmin, createUserControler.handle);
router.delete('/user', AuthHandler, EnsureAsAdmin, deleteUserController.handle);
router.get('/user', AuthHandler, EnsureAsAdmin, getUserController.handle);
router.put('/user/edit/:id', AuthHandler, EnsureAsAdmin, editUserController.handle);
router.post('/login', authenticateUserController.handle);


router.post('/book',uploadconfig.single('image') ,addBookController.handle);
router.delete('/book',removeBookController.handle);
