import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import User from "../types/user";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateAccessToken(
  username: string,
  email: string,
  isAdmin: boolean
) {
  return jwt.sign(
    { username: username, email: email, isAdmin: isAdmin },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
}

function verifyToken(token: string) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: JsonWebTokenError, user: any) => {
      if (err) return res.sendStatus(403);
      res.status(200).json({
        success: "true",
        data: {
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
      next();
    }
  );
}
