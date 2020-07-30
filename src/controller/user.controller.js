const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

/******************************************************************************
 *                                     User Controller
 ******************************************************************************/
class UserController {
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
        if (!req.body.name || !req.body.email) {
            const errors = {}

            if (!req.body.name) {
                errors['name'] = 'name field is required';
            }
            if (!req.body.email) {
                errors['email'] = 'email field is required';
            }

            throw new HttpException(400, 'Missing required fields', errors);
        }

        const result = await UserModel.addUser(req.body.name, req.body.age, req.body.email);

        res.send(result);
    });
}



/******************************************************************************
 *                                     Export
 ******************************************************************************/
module.exports = new UserController;