const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { check, validationResult } = require('express-validator');

/******************************************************************************
 *                                     User Controller
 ******************************************************************************/
class UserController {
    checkUserSchema = [
        check('name')
            .exists()
            .withMessage('Required field')
            .isAlpha()
            .withMessage('Must be only alphabetical chars')
            .isLength({ min: 3 })
            .withMessage('Must be at least 3 chars long'),
        check('email')
            .exists()
            .withMessage('Required field')
            .isEmail()
            .withMessage('Must be a valid email'),
        check('age')
            .optional()
            .isNumeric()
            .withMessage('Must be a number')
    ];

    getAllUsers = awaitHandlerFactory(async (req, res, next) => {
        const userList = await UserModel.getAllUsers();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(userList);
    });

    getUserById = awaitHandlerFactory(async (req, res, next) => {
        const user = await UserModel.getUserById(req.params.id);
        if (!user.length) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    });

    getUserByName = awaitHandlerFactory(async (req, res, next) => {
        const user = await UserModel.getUserByName(req.params.name);
        if (!user.length) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    });

    createUser = awaitHandlerFactory(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }

        const result = await UserModel.createUser(req.body.name, req.body.age, req.body.email);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.send('User was created!');
    });

    updateUser = awaitHandlerFactory(async (req, res, next) => {

        const result = await UserModel.updateUser(req.body.name, req.body.age, req.body.email);


        // res.send('User was updated!');
    });
}



/******************************************************************************
 *                                     Export
 ******************************************************************************/
module.exports = new UserController;