import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { router } from './routes';
import './database';
import helmet from 'helmet';

const port = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server is Running at port ${port}`);
});
