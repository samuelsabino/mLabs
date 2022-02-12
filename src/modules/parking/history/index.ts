import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { historyController } from './controller';

export const controller = historyController(fakeParkingRepository);
