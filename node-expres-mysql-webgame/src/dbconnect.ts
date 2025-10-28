import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const conn: Connection = mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
});
