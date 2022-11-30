import express, { Request, Response, Express } from "express";

import { loginHandler, registerHandler } from "../service/auth";

const router = express.Router();

import {
  createSongHandler,
  readSongHandler,
  updateSongHandler,
  deleteSongHandler,
} from "../service/song";

import { songListHandler, artistListHandler } from "../service/artist";

import { authenticateUser, authenticateAdmin, authenticateSpecificUser } from "../middleware/auth";
import { getAllSubscriptionRequestsHandler, updateSubscriptionHandler } from "../service/subscription";

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server - Hello World!");
});

router.post("/login", loginHandler);

router.post("/register", registerHandler);


router.use("/song", authenticateUser);

router.post("/song", createSongHandler);

router.get("/song/:id", readSongHandler);

router.put("/song/:id", updateSongHandler);

router.delete("/song/:id", deleteSongHandler);

router.get("/artist/song/:id", songListHandler);

router.get("/artist", artistListHandler);


router.use("/subscription", authenticateAdmin);

router.get("/subscription", getAllSubscriptionRequestsHandler);

router.put("/subscription/update", updateSubscriptionHandler);

module.exports = router;
