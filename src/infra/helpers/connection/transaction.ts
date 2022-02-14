import mongoose, { ClientSession } from 'mongoose';
import { databaseConnection } from '../../../infra/config/database';

let session: ClientSession;
let conn: typeof mongoose;

beforeAll(async () => {
  conn = await databaseConnection.connect();

  session = await conn.startSession();
  session.startTransaction();
}, 5000);

afterEach(async () => {
  await conn.connection.db.collection('parkings').deleteMany({});
}, 5000);

afterAll(async () => {
  await session.abortTransaction();
  session.endSession();

  await databaseConnection.disconnect();
}, 5000);
