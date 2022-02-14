import { mongodbParkingRepository } from '../../../repositories/mongodb/parking/repository';
import { paymentController } from './controller';

export const controller = paymentController(mongodbParkingRepository);
