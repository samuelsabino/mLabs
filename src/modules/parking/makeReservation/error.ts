import { ApplicationError } from '../../../application/errors';

export class MakeReservationError extends ApplicationError {
  static invalidPlate() {
    return new MakeReservationError('Invalid plate.', 400);
  }

  static missingParams(params: string) {
    return new MakeReservationError(`Missing params: ${params}`, 406);
  }
}
