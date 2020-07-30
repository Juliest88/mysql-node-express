const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { check, validationResult } = require('express-validator');

/******************************************************************************
 *                                     User Controller
 ******************************************************************************/
class UserController {
    checkUserValidation = [
        check('name')
            .isAlpha()
            .withMessage('Must be only alphabetical chars')
            .isLength({ min: 3 })
            .withMessage('Must be at least 3 chars long'),
        check('email')
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

    getUserByName = awaitHandlerFactory(async (req, res, next) => {
        const user = await UserModel.getUserByName(req.params.name);
        if (!user.length) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    });

    addUser = awaitHandlerFactory(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Missing required fields', errors);
        }

        const result = await UserModel.addUser(req.body.name, req.body.age, req.body.email);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.send('User was created!');
    });
}



/******************************************************************************
 *                                     Export
 ******************************************************************************/
module.exports = new UserController;