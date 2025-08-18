import express from 'express';
import userController from '../controllers/user.controller.js';
import auth from '../middleware/auth.middleware.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import { createUserSchema, updateUserSchema, validateLogin } from '../middleware/validators/userValidator.middleware.js';
import Role from '../utils/userRoles.utils.js';

const router = express.Router();

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users

router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1

router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia

router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami

router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users

router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update

router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

export default router;