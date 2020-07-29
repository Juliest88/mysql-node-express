const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', userController.getAllUsers); // localhost:3000/user/
router.get('/:name', userController.getUserByName); // localhost:3000/user/julia

module.exports = router;