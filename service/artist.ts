import { SongModel } from "../models/song";
import { Request, Response } from "express";
import UserModel from "../models/user";
import { checkSubscription } from "../templates/soapTemplates";
const util = require("util");
const soapRequest = require('easy-soap-request');

const songListHandler = async (req: Request, res: Response) => {
  const songModel = new SongModel();
  const page = parseInt(req.query.page as string);
  const userId = parseInt(req.query["user_id"] as string);
  const artistId = parseInt(req.params.id);
  const xml = util.format(checkSubscription.template, userId, artistId);
  const { response } = await soapRequest({
    url: checkSubscription.url,
    headers: checkSubscription.headers,
    xml: xml,
  });
  const { headers, body, statusCode } = response;
  try {
    if((body as string).includes("ACCEPTED")) {
      const songList = await songModel.findSongsByArtistId(artistId, page * 10 - 10);
      res.status(200).json({
        message: "Song list retrieved",
        data: {
          songList: songList,
        },
      });
    }
    else {
      res.status(403).json({
        message: "Forbidden",
      });
    }
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
