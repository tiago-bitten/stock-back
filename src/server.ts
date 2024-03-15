import express from 'express';
import { router } from './app';

const app = express();

app.use(express.json());
app.use('/api', router);

const server = app.listen(3000, () =>
  console.log('Stock server ready at: http://localhost:3000')
);

export default server;
