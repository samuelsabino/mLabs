import { Express, Router } from 'express';
import { parkingRouter } from '../../infra/routes/parking';

export const configRoute = (app: Express) => {
  const router = Router();

  app.use('/parking', parkingRouter(router));
};
