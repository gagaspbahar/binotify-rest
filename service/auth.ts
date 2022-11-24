import dotenv from "dotenv";
import UserModel from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../types/user";
import { LoginRequest } from "../types/request";

const jwt = require("jsonwebtoken");

dotenv.config();

const loginHandler = async (req: Request<LoginRequest>, res: Response) => {
  const userModel = new UserModel();
  const username = req.body?.username;
  const password = req.body?.password;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      const user = await userModel.findOneByUsername(username);
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Login failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Login successful. Logged in as " + user.username,
              token: token,
            });
          }
          res.status(401).json({
            message: "Login failed",
          });
        });
      }
    }
  });
};

const registerHandler = async (req: Request<User>, res: Response) => {
  console.log(req.body)
  const initialUser: User = req.body;
  const user = {isAdmin: false, ...initialUser};
  console.log(user)
  user.password = await bcrypt.hash(user.password, 10);
  try {
    const userModel = new UserModel();
    const newUserID = await userModel.create(user);
    res.status(200).json({
      message: "User created with user id " + newUserID,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

export { loginHandler, registerHandler };