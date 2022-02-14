import 'express-async-errors';

import app from './config/app';
import { databaseConnection } from './config/database';
import { env } from './config/envs';

const startServer = async () => {
  app.listen(env.PORT, async () => {
    await databaseConnection.connect();
    console.log('Server running at ' + env.PORT);
  });
};

startServer();
