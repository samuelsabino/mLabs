import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { removeReservationController } from './controller';

export const controller = removeReservationController(fakeParkingRepository);
