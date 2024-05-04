import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./database/data-source";
import UsuarioRouter from './app/routes/UsuarioRouter';
import AuthRouter from './app/routes/AuthRouter';
import EmpresaRouter from './app/routes/EmpresaRouter';
import HealthRoute from './app/routes/HealthRoute';
import { env } from "process";

const app = express();

app.use(cors());
app.use(express.json());

//#region = ROUTERS
app.use(AuthRouter)
app.use(UsuarioRouter);
app.use(EmpresaRouter);
app.use(HealthRoute);
//#endregion

const PORT = env.PORT || 3333;

AppDataSource.initialize().then(async () => {
    app.listen(PORT, () => {
        console.log('Server is running on port 3333');
    });
});