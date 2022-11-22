import { PoolClient } from 'pg';
const database = require('../core/database');
const client: PoolClient = database.client;

type User = {
  username: string;
  password: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

class UserModel {
  static rowsToUser(row: any): User {
    return {
      username: row.username,
      password: row.password,
      email: row.email,
      name: row.name,
      isAdmin: row.is_admin,
    };
  }
  static async create(user: User) {
    const result = await client.query(
      `INSERT INTO users (username, password, email, name, is_admin) VALUES ($1, $2, $3, $4, false) RETURNING user_id`,
      [user.username, user.password, user.email, user.name]
    );
    return result.rows[0].user_id;
  }

  static async findOneByUsername(username: string) {
    const result = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    return UserModel.rowsToUser(result.rows[0]);
  }

  static async findOneByEmail(email: string) {
    const result = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return UserModel.rowsToUser(result.rows[0]);
  }

  static async findOneById(id: number) {
    const result = await client.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [id]
    );
    return UserModel.rowsToUser(result.rows[0]);
  }

  static async findNameById(id: number) {
    const result = await client.query(
      `SELECT name FROM users WHERE user_id = $1`,
      [id]
    );
    return result.rows[0].name;
  }

  static async findArtists() {
    const result = await client.query(
      `SELECT * FROM users WHERE is_admin = false`
    );
    return result.rows.map(UserModel.rowsToUser);
  }
}

export { UserModel, User };