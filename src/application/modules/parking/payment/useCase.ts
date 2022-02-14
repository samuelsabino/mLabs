import { Result } from '../../../domain/models';
import { IParkingRepository } from '../../../domain/repositories';
import { calculateDifference } from '../../../helpers/functions';
import { PaymentDTO, PaymentResponse } from './dto';
import { PaymentError } from './error';

export const paymentUseCase = (repository: IParkingRepository) => ({
  execute: async ({ id }: PaymentDTO & PaymentDTO): Promise<Result<PaymentResponse, PaymentError>> => {
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

    const paidReservation = await repository.update(+id, { paid: true, time });

    if ('id' in paidReservation) {
      const { id, plate, time, paid } = paidReservation;

      return {
        success: true,
        data: { id, plate, time, paid }
      };
    }

    return {
      success: false,
      error: paidReservation
    };
  }
});
