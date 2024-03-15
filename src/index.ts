import express from 'express';
import cors from 'cors';

import app from './app';

app.use(express.json());
app.use(cors());

const server = app.listen(3000, () =>
  console.log('Stock server ready at: http://localhost:3000')
);