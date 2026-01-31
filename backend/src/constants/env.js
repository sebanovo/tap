import 'dotenv/config';

export class Env {
  static POSTGRES_HOST = process.env.POSTGRES_HOST;
  static POSTGRES_PORT = process.env.POSTGRES_PORT;
  static DATABASE_URL = process.env.DATABASE_URL;
  static JWT_SECRET = process.env.JWT_SECRET;
}
