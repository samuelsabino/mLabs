import { mongodbParkingRepository } from '../../../repositories/mongodb/parking/repository';
import { removeReservationController } from './controller';

export const controller = removeReservationController(mongodbParkingRepository);
