import express, { NextFunction, Request, Response } from 'express';

import { ApplicationError } from '../../application/errors';
import { configRoute } from './route';

const app = express();

app.use(express.json());
configRoute(app);

app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ApplicationError) {
    return response.status(err.code).json({ message: err.message });
  }

  return response.status(500).json({ message: 'Internal Server Error.' });
});

export default app;
