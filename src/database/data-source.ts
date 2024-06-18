import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities.list';
import { migrations } from './migrations.list';
dotenv.config();

export const AppDataSource = new DataSource({ 
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: entities,
    migrations: migrations,
    migrationsRun: true,
    subscribers: []
});