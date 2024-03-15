import express from 'express';
import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export const app = express();

export default app;
