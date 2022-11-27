import { SongModel } from "../models/song";
import { Request, Response } from "express";
import { SongRequest } from "../types/request";
import Song from "../types/song";

const createSongHandler = async (req: Request<Song>, res: Response) => {
  const song: Song = req.body;
  const filepath = req.file?.path.split("static\\")[1];
  const createdSong: Song = {
    ...song,
    audio_path: "/static/" + filepath,
  };
  try {
    const songModel = new SongModel();
    const newSongID = await songModel.create(
      createdSong.title!,
      createdSong.artist_id!,
      createdSong.audio_path!
    );
    res.status(200).json({
      message: "Song created with song id " + newSongID,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

const readSongHandler = async (req: Request, res: Response) => {
  const songModel = new SongModel();
  const songID = parseInt(req.params.id);
  try {
    const songLink = await songModel.getLink(songID);
    res.status(200).json({
      message: "Song link retrieved",
      data: {
        link: songLink,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

const updateSongHandler = async (req: Request, res: Response) => {
  const songModel = new SongModel();
  const songID = parseInt(req.params.id);
  const song: Song = req.body;
  try {
    const initialSong = await songModel.findSongById(songID);
    let updatedSong: Song;

    if (req.file !== undefined) {
      const filepath = req.file?.path.split("static\\")[1];
      updatedSong = {
        ...initialSong,
        audio_path: "/static/" + filepath,
      };
    } else {
      updatedSong = {
        ...initialSong,
      };
    }

    if (song.title !== undefined) {
      updatedSong.title = song.title;
    }

    await songModel.update(
      songID,
      updatedSong.title!,
      updatedSong.artist_id!,
      updatedSong.audio_path!
    );
    res.status(200).json({
      message: "Song updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

const deleteSongHandler = async (req: Request, res: Response) => {
  const songModel = new SongModel();
  const songID = parseInt(req.params.id);
  try {
    await songModel.delete(songID);
    res.status(200).json({
      message: "Song with id " + songID + " deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

export {
  createSongHandler,
  readSongHandler,
  updateSongHandler,
  deleteSongHandler,
};
