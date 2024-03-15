import express from 'express';
import { router } from './app'; // Import the router from app.ts

const app = express();

app.use(express.json());
app.use('/api', router); // Use the router for '/api' routes

const server = app.listen(3000, () =>
  console.log('Stock server ready at: http://localhost:3000')
);

export default server; // Export the server
