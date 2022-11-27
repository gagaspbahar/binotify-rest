import { SongModel } from "../models/song";
import { Request, Response } from "express";
import UserModel from "../models/user";
import User from "../types/user";

const songListHandler = async (req: Request, res: Response) => {
  const songModel = new SongModel();
  const id = parseInt(req.params.id);
  const page = parseInt(req.query.page as string);
  try {
    const songs = await songModel.findSongsByArtistId(id, page * 10 - 10);
    res.status(200).json({
      message: "Song list retrieved",
      data: {
        songs: songs,
      },
      page: page,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

const artistListHandler = async (req: Request, res: Response) => {
  const userModel: UserModel = new UserModel();
  const page = parseInt(req.query.page as string);
  try {
    const artists = await userModel.findArtists(page * 10 - 10);
    const artistList = artists.map((artist) => {
      let artResponse: ArtistListResponse;
      artResponse = {
        user_id: artist.userId!,
        name: artist.name!,
        username: artist.username!,
        email: artist.email!,
      };
      return artResponse;
    });

    res.status(200).json({
      message: "Artist list retrieved",
      data: {
        artists: artistList,
      },
      page: page,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error " + err,
    });
  }
};

export { songListHandler, artistListHandler };
