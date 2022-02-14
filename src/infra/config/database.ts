import mongoose from 'mongoose';

import { env } from './envs';

export const databaseConnection = {
  connect: async () => {
    const conn = await mongoose.connect(`${env.MONGO_URL}/${env.DB_NAME}`).catch((e) => {
      console.log('Connection error');
      throw e;
    });

    console.log('Database connected');
    return conn;
  },
  disconnect: async () => {
    await mongoose.disconnect().catch((err: Error) => console.log(err));
    console.log('Database connected');
  }
};
