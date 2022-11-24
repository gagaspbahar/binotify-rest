import { SongModel } from "../models/song";
import { Request, Response } from "express";
import { SongRequest } from "../types/request";
import Song from "../types/song";


const createSongHandler = async (req: Request<Song>, res: Response) => {
  const song = req.body;
  try {
    const songModel = new SongModel();
    const newSongID = await songModel.create(song.title, song.artist_id, song.audio_path);
    res.status(200).json({
      message: "Song created with song id " + newSongID,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
}