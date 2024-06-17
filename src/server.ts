import "reflect-metadata";
import express from 'express';
import cors from 'cors';

import { AppDataSource } from "./database/data-source";
import { routers } from "./app/routes/routers.list";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

AppDataSource.initialize().then(async () => {
    app.listen(3333, () => {
        if (process.env.NODE_ENV === 'dev') {
            console.log('Server running on dev env.');
        } else {
            console.log('Server running on prod env.');
        }
    });
});