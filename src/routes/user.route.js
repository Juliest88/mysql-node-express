const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authenticateJWT = require('../middleware/auth.middleware');
const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.get('/', authenticateJWT, userController.getAllUsers); // localhost:3000/api/v1/users
router.get('/id/:id', userController.getUserById); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', userController.getUserByuserName); // localhost:3000/api/v1/usersname/julia
router.post('/', createUserSchema, userController.createUser); // localhost:3000/api/v1/users
// using patch for partial update
router.patch('/id/:id', updateUserSchema, userController.updateUser); // localhost:3000/api/v1/usersid/1
router.delete('/id/:id', userController.deleteUser); // localhost:3000/api/v1/usersid/1


router.post('/login', validateLogin, userController.userLogin); // localhost:3000/api/v1/users/login

module.exports = router;