import { ApplicationError } from '../application';

export class RepositoryError extends ApplicationError {
  static alreadyExists() {
    return new RepositoryError('Plate already registered.', 409);
  }

  static notFound() {
    return new RepositoryError('Reservation not found.', 404);
  }
}
