import { Result } from '../../../application/domain/models';
import { IParkingRepository } from '../../../application/domain/repositories';
import { calculateDifference } from '../../../application/helpers/functions';
import { PaymentDTO, PaymentId, PaymentResponse } from './dto';
import { PaymentError } from './error';

export const paymentUseCase = (repository: IParkingRepository) => ({
  execute: async ({ paid, id }: PaymentDTO & PaymentId): Promise<Result<PaymentResponse, PaymentError>> => {
    const reservationToUpdate = await repository.findById(+id);

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

    const time = calculateDifference(reservationToUpdate.created, new Date());

    const paidReservation = await repository.update(+id, { paid, time });

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
});
