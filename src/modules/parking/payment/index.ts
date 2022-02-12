import { fakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { paymentController } from './controller';

export const controller = paymentController(fakeParkingRepository);
