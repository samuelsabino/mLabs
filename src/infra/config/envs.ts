import dotenv from 'dotenv';
import { envsafe, port, str } from 'envsafe';

dotenv.config();

export const env = envsafe({
  PORT: port(),
  MONGO_URL: str(),
  DB_NAME: str()
});
