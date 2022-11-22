import dotenv from "dotenv";
import { Pool, PoolClient } from "pg";
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
const db_port = parseInt(process.env.DB_PORT || "3306");


class Database {
  pool: Pool;
  client: PoolClient | undefined;
  constructor() {
    this.pool = new Pool({
      user: db_username,
      host: db_host,
      database: db_name,
      password: db_password,
      port: db_port,
      max: 20,
      idleTimeoutMillis: 30000,
    });
    this.init();
  }
  async init() {
    this.client = await this.pool.connect();
  }
}

export default new Database();