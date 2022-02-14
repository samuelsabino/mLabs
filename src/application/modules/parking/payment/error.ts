import { ApplicationError } from '../../../errors';

export class PaymentError extends ApplicationError {
  static paymentAlreadyMade() {
    return new PaymentError('Payment already made.', 409);
  }
}
