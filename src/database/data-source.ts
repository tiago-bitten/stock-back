import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities.list';
import { migrations } from './migrations.list';

dotenv.config();

const DB_HOST = process.env.MYSQLHOST;
const DB_PORT = Number(process.env.MYSQLPORT);
const DB_USER = process.env.MYSQLUSER;
const DB_PASS = process.env.MYSQLPASSWORD;
const DB_NAME = process.env.MYSQLDATABASE;

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
