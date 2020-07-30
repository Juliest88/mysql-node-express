const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { check, validationResult } = require('express-validator');

/******************************************************************************
 *                                     User Controller
 ******************************************************************************/
class UserController {
    checkUserValidation = [
        check('name').isAlpha().isLength({ min: 3 }),
        check('email').isEmail(),
        check('age').optional().isNumeric()
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
            throw new HttpException(400, 'Missing required fields', errors.array());
        }

        const result = await UserModel.addUser(req.body.name, req.body.age, req.body.email);

        res.send(result);
    });
}



/******************************************************************************
 *                                     Export
 ******************************************************************************/
module.exports = new UserController;