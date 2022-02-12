import { ApplicationError } from '../application';

export class ParkingRepositoryError extends ApplicationError {
  static alreadyExists() {
    return new ParkingRepositoryError('Plate already registered.', 409);
  }

  static notFound() {
    return new ParkingRepositoryError('Reservation not found.', 404);
  }
}
