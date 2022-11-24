import { PoolClient, Pool } from 'pg';
import Database from '../core/database';
import User from '../types/user';


class UserModel {
  pool: Pool;
  constructor() {
    this.pool = new Database().pool;
  }
  static rowsToUser(row: any): User {
    console.log(row)
    return {
      username: row.username,
      password: row.password,
      email: row.email,
      name: row.name,
      isAdmin: row.is_admin,
    };
  }
  async create(user: User) {
    const result = await this.pool.query(
      `INSERT INTO users (username, password, email, name, is_admin) VALUES ($1, $2, $3, $4, false) RETURNING user_id`,
      [user.username, user.password, user.email, user.name]
    );
    return result.rows[0].user_id;
  }

  async findOneByUsername(username: string) {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    return UserModel.rowsToUser(result.rows[0]);
  }

  async findOneByEmail(email: string) {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return UserModel.rowsToUser(result.rows[0]);
  }

  async findOneById(id: number) {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [id]
    );
    return UserModel.rowsToUser(result.rows[0]);
  }

  async findNameById(id: number) {
    const result = await this.pool.query(
      `SELECT name FROM users WHERE user_id = $1`,
      [id]
    );
    return result.rows[0].name;
  }

  async findArtists() {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE is_admin = false`
    );
    return result.rows.map(UserModel.rowsToUser);
  }
}

export default UserModel;