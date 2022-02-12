import { Result } from '../../../application/domain/models';
import { IParkingRepository } from '../../../application/domain/repositories';
import { calculateDifference } from '../../../application/helpers/functions';
import { RemoveReservationDTO, RemoveReservationResponse } from './dto';
import { RemoveReservationError } from './error';

export const removeReservationUseCase = (repository: IParkingRepository) => ({
  execute: async (data: RemoveReservationDTO): Promise<Result<RemoveReservationResponse, RemoveReservationError>> => {
    const reservartion = await repository.findById(+data.id);

    if ('code' in reservartion) {
      return {
        success: false,
        error: reservartion
      };
    }

    if (reservartion.left) {
      return {
        success: false,
        error: RemoveReservationError.alreadyLeft()
      };
    }

    if (!reservartion.paid) {
      return {
        success: false,
        error: RemoveReservationError.paymentNotMade()
      };
    }

    const time = calculateDifference(reservartion.created, new Date());

    const paidReservation = await repository.update(+data.id, { left: true, time });

    if ('id' in paidReservation) {
      const { id, plate, left } = paidReservation;

      return {
        success: true,
        data: { id, plate, left }
      };
    }

    return {
      success: false,
      error: paidReservation
    };
  }
});
