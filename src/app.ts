import express from 'express';
import { Router } from 'express';

export const router = Router(); // Create a router

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export const app = express(); // Create an Express app

// Export the router as well if needed
export default app;
