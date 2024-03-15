import express from 'express';
import { Router } from 'express';

const app = express();
export const router = Router();

app.use('/api', router);

export default app;