import { ApplicationError } from '../../../application/errors';

export class ConnectionError extends ApplicationError {
  static connectionNotFound() {
    return new ConnectionError('Connection not found', 404);
  }
}
