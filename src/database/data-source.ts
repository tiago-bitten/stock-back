import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities.list';
import { migrations } from './migrations.list';

dotenv.config();

const DB_HOST = process.env.MYSQLHOST || process.env.DB_HOST;
const DB_PORT = Number(process.env.MYSQLPORT) || Number(process.env.DB_PORT);
const DB_USER = process.env.MYSQLUSER || process.env.DB_USER;
const DB_PASS = process.env.MYSQLPASSWORD || process.env.DB_PASS;
const DB_NAME = process.env.MYSQLDATABASE || process.env.DB_NAME;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
  throw new Error('Algumas variáveis de ambiente do banco de dados estão ausentes.');
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: entities,
  migrations: migrations,
  migrationsRun: true,
  subscribers: [],
});
