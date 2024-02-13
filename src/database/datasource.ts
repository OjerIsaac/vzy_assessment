import * as path from 'path';
import { DataSource } from 'typeorm';
import { env } from './database.env';

export const dataSource = new DataSource({
  type: 'mongodb',
  url: env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../**/migrations/*{.ts,.js}')],
  synchronize: false,
});
