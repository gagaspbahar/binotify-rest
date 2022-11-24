import { Pool, PoolClient } from 'pg';
import Database from '../core/database';
import Song from '../types/song';

const database = require('../core/database');
const client: PoolClient = database.client;


class SongModel {
  pool: Pool;
  constructor() {
    this.pool = new Database().pool;
  }

  static rowsToSong(row: any): Song {
    return {
      songId: row.song_id,
      title: row.title,
      artist_id: row.artist_id,
      audio_path: row.audio_path,
    };
  }

  async create(title: string, artist_id: number, audio_path: string) {
    const result = await this.pool.query(
      `INSERT INTO songs (title, artist_id, audio_path) VALUES ($1, $2, $3) RETURNING song_id`,
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
      `SELECT * FROM songs WHERE title = $1`,
      [title]
    );
    return SongModel.rowsToSong(result.rows[0]);
  }

  async findSongsByArtistId(artist_id: number) {
    const result = await this.pool.query(
      `SELECT * FROM songs WHERE artist_id = $1`,
      [artist_id]
    );
    return result.rows.map(SongModel.rowsToSong);
  }

  async update(songId: number, title: string, artist_id: number, audio_path: string) {
    const result = await this.pool.query(
      `UPDATE songs SET title = $1, artist_id = $2, audio_path = $3 WHERE song_id = $4 RETURNING song_id`,
      [title, artist_id, audio_path, songId]
    );
    return result.rows[0].song_id;
  }

  static async delete(songId: number) {
    const result = await client.query(
      `DELETE FROM songs WHERE song_id = $1`,
      [songId]
    );
    return result.rowCount;
  }
}

export { SongModel, Song };