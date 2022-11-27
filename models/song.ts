import { Pool } from "pg";
import Database from "../core/database";
import Song from "../types/song";

class SongModel {
  pool: Pool;
  constructor() {
    this.pool = new Database().pool;
  }

  static rowsToSong(row: any): Song {
    return {
      songId: row.song_id,
      title: row.judul,
      artist_id: row.penyanyi_id,
      audio_path: row.audio_path,
    };
  }

  async create(title: string, artist_id: number, audio_path: string) {
    const result = await this.pool.query(
      `INSERT INTO songs (judul, penyanyi_id, audio_path) VALUES ($1, $2, $3) RETURNING song_id`,
      [title, artist_id, audio_path]
    );
    return result.rows[0].song_id;
  }

  async findSongById(id: number) {
    const result = await this.pool.query(
      `SELECT * FROM songs WHERE song_id = $1`,
      [id]
    );
    return SongModel.rowsToSong(result.rows[0]);
  }

  async findSongByTitle(title: string) {
    const result = await this.pool.query(
      `SELECT * FROM songs WHERE judul = $1`,
      [title]
    );
    return SongModel.rowsToSong(result.rows[0]);
  }

  async findSongsByArtistId(artist_id: number, offset: number) {
    const result = await this.pool.query(
      `SELECT * FROM songs WHERE penyanyi_id = $1 LIMIT 10 OFFSET $2`,
      [artist_id, offset]
    );
    return result.rows.map(SongModel.rowsToSong);
  }


  async update(
    songId: number,
    title: string,
    artist_id: number,
    audio_path: string
  ) {
    const result = await this.pool.query(
      `UPDATE songs SET judul = $1, penyanyi_id = $2, audio_path = $3 WHERE song_id = $4 RETURNING song_id`,
      [title, artist_id, audio_path, songId]
    );
    return result.rows[0].song_id;
  }

  async delete(songId: number) {
    const result = await this.pool.query(
      `DELETE FROM songs WHERE song_id = $1`,
      [songId]
    );
    return result.rowCount;
  }

  async getLink(songId: number) {
    const result = await this.pool.query(
      `SELECT audio_path FROM songs WHERE song_id = $1`,
      [songId]
    );
    return result.rows[0].audio_path;
  }
}

export { SongModel, Song };
