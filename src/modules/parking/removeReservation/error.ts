import { ApplicationError } from '../../../application/errors/application';

export class RemoveReservationError extends ApplicationError {
  static alreadyLeft() {
    return new RemoveReservationError('Reservation alredy left.', 409);
  }

  static paymentNotMade() {
    return new RemoveReservationError('The reservation payment has not been made.', 409);
  }
}
