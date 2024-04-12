import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./database/data-source";
import UserRouter from './app/routes/UserRouter';
import AuthRouter from './app/routes/AuthRouter';

const app = express();

app.use(cors());
app.use(express.json());

//#region = ROUTERS

app.use(UserRouter);
app.use(AuthRouter);

//#endregion

AppDataSource.initialize().then(async () => {
    app.listen(3333, () => {
        console.log('Server is running on port 3333');
    });
});