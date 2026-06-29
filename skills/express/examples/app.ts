import express, { Request, Response, NextFunction } from 'express';
const app = express();
app.use(express.json());
app.get('/ping', (req, res) => res.json({ msg: 'pong' }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});