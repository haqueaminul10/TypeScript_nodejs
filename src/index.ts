import express, { type Request, type Response } from 'express';
import './config/database.js';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world + TypeScript!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
