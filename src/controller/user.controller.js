const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    getAllUsers = awaitHandlerFactory(async (req, res, next) => {
        const userList = await UserModel.getAllUsers();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(userList);
    });

    getUserById = awaitHandlerFactory(async (req, res, next) => {
        const user = await UserModel.getUserById(req.params.id);
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    });

    getUserByuserName = awaitHandlerFactory(async (req, res, next) => {
        const user = await UserModel.getUserByuserName(req.params.username);
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    });

    createUser = awaitHandlerFactory(async (req, res, next) => {
        this.checkValidation(req);

        await this.processPreSave(req);

        const result = await UserModel.createUser(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('User was created!');
    });

    updateUser = awaitHandlerFactory(async (req, res, next) => {
        this.checkValidation(req);

        await this.processPreSave(req);

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.updateUser(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });
    });

    deleteUser = awaitHandlerFactory(async (req, res, next) => {
        const result = await UserModel.deleteUser(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User was deleted!');
    });

    userLogin = awaitHandlerFactory(async (req, res, next) => {
        this.checkValidation(req);

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        res.send({ user, token });
    });

    userLogout = awaitHandlerFactory(async (req, res, next) => {
        res.clearCookie('login_token');
        res.send('Thank you!');
    });

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    processPreSave = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;