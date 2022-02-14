import { makeReservationController } from './controller';
import { mongodbParkingRepository } from '../../../repositories/mongodb/parking/repository';

export const controller = makeReservationController(mongodbParkingRepository);
