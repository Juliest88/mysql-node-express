const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users

/**
 * @swagger
 * /api/v1/users/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1

/**
 * @swagger
 * /api/v1/users/username/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia

/**
 * @swagger
 * /api/v1/users/whoami:
 *   get:
 *     summary: Get current user info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users

/**
 * @swagger
 * /api/v1/users/id/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update

/**
 * @swagger
 * /api/v1/users/id/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

module.exports = router;