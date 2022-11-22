import { PoolClient } from 'pg';
const database = require('../core/database');
const client: PoolClient = database.client;

type Song = {
  songId: number;
  title: string;
  artist_id: number;
  audio_path: string;
}

class SongModel {
  static rowsToSong(row: any): Song {
    return {
      songId: row.song_id,
      title: row.title,
      artist_id: row.artist_id,
      audio_path: row.audio_path,
    };
  }

  static async create(title: string, artist_id: number, audio_path: string) {
    const result = await client.query(
      `INSERT INTO songs (title, artist_id, audio_path) VALUES ($1, $2, $3) RETURNING song_id`,
      [title, artist_id, audio_path]
    );
    return result.rows[0].song_id;
  }

  static async findSongById(id: number) {
    const result = await client.query(
      `SELECT * FROM songs WHERE song_id = $1`,
      [id]
    );
    return this.rowsToSong(result.rows[0]);
  }
  static async findSongByTitle(title: string) {
    const result = await client.query(
      `SELECT * FROM songs WHERE title = $1`,
      [title]
    );
    return this.rowsToSong(result.rows[0]);
  }
  static async findSongsByArtistId(artist_id: number) {
    const result = await client.query(
      `SELECT * FROM songs WHERE artist_id = $1`,
      [artist_id]
    );
    return result.rows.map(this.rowsToSong);
  }
  static async update(songId: number, title: string, artist_id: number, audio_path: string) {
    const result = await client.query(
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