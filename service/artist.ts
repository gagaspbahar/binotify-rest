import { SongModel } from "../models/song";
import { Request, Response } from "express";

const songListHandler = async (req: Request, res: Response) => {
  const songModel = new SongModel();
  const id = parseInt(req.params.id);
  const page = parseInt(req.query.page as string);
  try {
    const songs = await songModel.findSongsByArtistId(id, page*10-10);
    res.status(200).json({
      message: "Song list retrieved",
      data: {
        songs: songs,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
}

export {songListHandler};