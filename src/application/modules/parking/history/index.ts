import { mongodbParkingRepository } from './../../../repositories/mongodb/parking/repository';
import { historyController } from './controller';

export const controller = historyController(mongodbParkingRepository);
