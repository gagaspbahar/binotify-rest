import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

const { loginHandler, registerHandler } = require("../service/auth");

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server - Hello World!");
});
router.post("/login", loginHandler);

router.post("/register", registerHandler);

module.exports = router;