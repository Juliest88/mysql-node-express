const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


router.get('/', userController.getAllUsers); // localhost:3000/user/
router.get('/:id', userController.getUserById); // localhost:3000/user/1
router.get('/:name', userController.getUserByName); // localhost:3000/user/julia
router.post('/', userController.createUserSchema, userController.createUser);
// using patch for partial update
router.patch('/:id', userController.updateUser);

module.exports = router;