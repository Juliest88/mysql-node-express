const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/role');
const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', auth(Role.Admin, Role.SuperUser), userController.getAllUsers); // localhost:3000/api/v1/users
router.get('/id/:id', auth(Role.Admin, Role.SuperUser), userController.getUserById); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(Role.Admin, Role.SuperUser), userController.getUserByuserName); // localhost:3000/api/v1/usersname/julia
router.post('/', auth(), createUserSchema, userController.createUser); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, userController.updateUser); // localhost:3000/api/v1/usersid/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), userController.deleteUser); // localhost:3000/api/v1/usersid/1


router.post('/login', validateLogin, userController.userLogin); // localhost:3000/api/v1/users/login

module.exports = router;