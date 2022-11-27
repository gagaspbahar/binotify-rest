import { Request, Response } from "express";
import { SongRequest } from "../types/request";

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const pathHandler = () => {
  console.log(path.join(__dirname, "static"));
  if (!fs.existsSync(path.join(__dirname, "../static"))) {
    fs.mkdirSync(path.join(__dirname, "../static"));
  }
  return path.join(__dirname, "../static");
};

const diskStorage = multer.diskStorage({
  destination: (
    req: Request<SongRequest>,
    file: Express.Multer.File,
    cb: any
  ) => {
    cb(null, pathHandler());
  },
  filename: (req: Request<SongRequest>, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({ storage: diskStorage }).single("file");

export default multerUpload;
