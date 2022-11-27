import express, { Request, Response, Express } from "express";

const router = express.Router();

const { loginHandler, registerHandler } = require("../service/auth");

const {
  createSongHandler,
  readSongHandler,
  updateSongHandler,
  deleteSongHandler,
} = require("../service/song");

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server - Hello World!");
});

router.post("/login", loginHandler);

router.post("/register", registerHandler);

router.post("/song", createSongHandler);

router.get("/song/:id", readSongHandler);

router.put("/song/:id", updateSongHandler);

router.delete("/song/:id", deleteSongHandler);

module.exports = router;
