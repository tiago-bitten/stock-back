import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities.list';
import { migrations } from './migrations.list';

dotenv.config();

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME
) {
  throw new Error('Algumas variáveis de ambiente do banco de dados estão ausentes.');
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, 
  logging: true,
  entities: entities,
  migrations: migrations,
  migrationsRun: true,
  subscribers: [],
});
