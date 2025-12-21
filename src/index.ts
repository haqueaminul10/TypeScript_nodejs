import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
