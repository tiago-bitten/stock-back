import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { entities } from './entities.list';
import { migrations } from './migrations.list';
import { env } from 'process';

export const AppDataSource = new DataSource({ 
    type: 'mysql',
    host: env.MYSQLHOST || '127.0.0.1',
    port: Number(env.MYSQLPORT) || 3306,
    username: env.MYSQLUSER || 'root',
    password: env.MYSQLPASSWORD || '',
    database: env.MYSQL_DATABASE || 'stocksense',
    synchronize: false,
    logging: false,
    entities: entities,
    migrations: migrations,
    migrationsRun: true,
    subscribers: []
});