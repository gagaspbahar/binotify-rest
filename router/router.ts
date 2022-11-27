import express, { Request, Response, Express } from "express";

import { loginHandler, registerHandler } from "../service/auth";

const router = express.Router();

// const { loginHandler, registerHandler } = require("../service/auth");

import {
  createSongHandler,
  readSongHandler,
  updateSongHandler,
  deleteSongHandler,
} from "../service/song";

import { songListHandler }  from "../service/artist";

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server - Hello World!");
});

router.post("/login", loginHandler);

router.post("/register", registerHandler);

router.post("/song", createSongHandler);

router.get("/song/:id", readSongHandler);

router.put("/song/:id", updateSongHandler);

router.delete("/song/:id", deleteSongHandler);

router.get("/song/artist/:id", songListHandler);

module.exports = router;
