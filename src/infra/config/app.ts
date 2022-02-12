import { ApplicationError } from '../../application/errors';
import express, { NextFunction, Request, Response } from 'express';

import { configRoute } from './route';

const app = express();

app.use(express.json());
configRoute(app);

app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ApplicationError) {
    return response.status(err.code).json({ message: err.message });
  }

  console.log(err);

  return response.status(500).json({ message: 'Erro interno do servidor.' });
});

export default app;
