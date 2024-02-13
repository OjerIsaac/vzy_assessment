import * as path from 'path';
import { DataSource } from 'typeorm';
import { env } from './database.env';

export const dataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../**/migrations/*{.ts,.js}')],
  synchronize: false,
});
