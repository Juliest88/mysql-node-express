const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const rateLimit = require('express-rate-limit');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

// Define a rate limiter for routes that require authorization
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});

router.get('/', auth(), authRateLimiter, awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/id/:id', auth(), authRateLimiter, awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), authRateLimiter, awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
router.get('/whoami', auth(), authRateLimiter, awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), authRateLimiter, updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), authRateLimiter, awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;