import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CreateUserTable1711801468579 } from './migrations/1711801468579-CreateUserTable';
import User from '../app/models/User';

export const AppDataSource = new DataSource({ 
    type: 'mysql',
    host: 'localhost',
    port: 3307, //No pc do gustavo fica 3307, mas padrão é 3306
    username: 'root',
    password: '123456',
    database: 'stock-sense',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [CreateUserTable1711801468579],
    subscribers: []
});