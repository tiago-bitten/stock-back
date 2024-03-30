import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./database/data-source";

const app = express();

app.use(cors());

app.use(express.json());

AppDataSource.initialize().then(async () => {
    console.log('Tiagão de 4');
    app.listen(3333, () => {
        console.log('Server is running on port 3333');
    });
});