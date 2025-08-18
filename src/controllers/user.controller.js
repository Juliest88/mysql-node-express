import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import UserModel from "../models/user.model.js";
import HttpException from "../utils/HttpException.utils.js";

class UserController {
  #excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  #generateAuthToken(userId) {
    const { secret, expiresIn, algorithm } = config.jwt;
    return jwt.sign({ user_id: userId.toString() }, secret, {
      expiresIn,
      algorithm,
    });
  }

  #validateRequest(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation failed", errors);
    }
  }

  async #hashPassword(password) {
    if (password) {
      return await bcrypt.hash(password, 8);
    }
    return password;
  }

  getAllUsers = async (req, res) => {
    const userList = await UserModel.find();
    if (!userList.length) {
      throw new HttpException(404, "Users not found");
    }
    const sanitizedUsers = userList.map((user) => this.#excludePassword(user));
    res.send(sanitizedUsers);
  };

  getUserById = async (req, res) => {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    res.send(this.#excludePassword(user));
  };

  getUserByuserName = async (req, res) => {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    res.send(this.#excludePassword(user));
  };

  getCurrentUser = async (req, res) => {
    res.send(this.#excludePassword(req.currentUser));
  };

  createUser = async (req, res) => {
    this.#validateRequest(req);
    const userData = { ...req.body };
    userData.password = await this.#hashPassword(userData.password);
    const result = await UserModel.create(userData);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }
    res.status(201).send("User was created!");
  };

  updateUser = async (req, res) => {
    this.#validateRequest(req);
    const { confirm_password, password, ...updates } = req.body;
    if (password) {
      updates.password = await this.#hashPassword(password);
    }
    const result = await UserModel.update(updates, req.params.id);
    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }
    const { affectedRows, changedRows, info } = result;
    const message = !affectedRows
      ? "User not found"
      : affectedRows && changedRows
      ? "User updated successfully"
      : "Update failed";
    res.send({ message, info });
  };

  deleteUser = async (req, res) => {
    const result = await UserModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "User not found");
    }
    res.send("User has been deleted");
  };

  userLogin = async (req, res) => {
    this.#validateRequest(req);
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new HttpException(401, "Unable to login!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(401, "Incorrect password!");
    }
    const token = this.#generateAuthToken(user.id);
    res.send({ ...this.#excludePassword(user), token });
  };
}

const userController = new UserController();
export default userController;
