import { calculateDifference } from '../../../application/helpers/functions';

import { Result } from '../../../application/domain/models';
import { IParkingRepository } from '../../../application/domain/repositories';
import { IUseCase } from '../../../application/interfaces';
import { PaymentDTO, PaymentId, PaymentResponse } from './dto';
import { PaymentError } from './error';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking';

export class PaymentUseCase implements IUseCase<PaymentDTO & PaymentId, PaymentResponse> {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async execute({ paid, id }: PaymentDTO & PaymentId): Promise<Result<PaymentResponse, PaymentError>> {
    const reservationToUpdate = await this.repository.findById(id);

    if ('code' in reservationToUpdate) {
      return {
        success: false,
        error: reservationToUpdate
      };
    }

    if (reservationToUpdate.paid) {
      return {
        success: false,
        error: PaymentError.paymentAlreadyMade()
      };
    }

    const time = calculateDifference(new Date(), reservationToUpdate.created);

    const paidReservation = await this.repository.update(id, { paid, time });

    if ('id' in paidReservation) {
      const { id, paid } = paidReservation;

      return {
        success: true,
        data: { id, paid }
      };
    }

    return {
      success: false,
      error: paidReservation
    };
  }
}
