import { ApplicationError } from '../../../application/errors';

export class MakeReservationError extends ApplicationError {
  static invalidPlate() {
    return new MakeReservationError('Invalid plate.', 400);
  }
}
