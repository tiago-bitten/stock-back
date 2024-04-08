import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { entities } from './entities.list';
import { migrations } from './migrations.list';

export const AppDataSource = new DataSource({ 
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'stocksense',
    synchronize: false, // Setar pra true só na hora de criar as tabelas
    logging: false,
    entities: entities,
    migrations: migrations,
    subscribers: []
});