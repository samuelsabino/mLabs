import { ApplicationError } from '../../../application/errors/application';

export class RemoveReservationError extends ApplicationError {
  static alreadyLeft() {
    return new RemoveReservationError('Reservation alredy left.', 409);
  }
}
