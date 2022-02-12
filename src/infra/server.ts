import 'express-async-errors';

import { env } from '../config/envs';
import app from './config/app';

const startServer = () => {
  console.log('database connected');
  app.listen(env.PORT, () => {
    console.log('Server running at ' + env.PORT);
  });
};

startServer();
