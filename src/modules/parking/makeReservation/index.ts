import { makeReservationController } from './controller';
import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';

export const controller = makeReservationController(fakeParkingRepository);
