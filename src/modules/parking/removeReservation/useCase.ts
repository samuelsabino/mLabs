import { FakeParkingRepository } from './../../../application/repositories/fake/parking/repository';
import { Result } from '../../../application/domain/models';
import { IParkingRepository } from '../../../application/domain/repositories';
import { calculateDifference } from '../../../application/helpers/functions';
import { IUseCase } from '../../../application/interfaces';

import { RemoveReservationDTO, RemoveReservationResponse } from './dto';
import { RemoveReservationError } from './error';

export class RemoveReservationUseCase implements IUseCase<RemoveReservationDTO, RemoveReservationResponse> {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async execute(data: RemoveReservationDTO): Promise<Result<RemoveReservationResponse, RemoveReservationError>> {
    const reservartion = await this.repository.findById(data.id);

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

    const time = calculateDifference(new Date(), reservartion.created);

    const paidReservation = await this.repository.update(data.id, { left: true, time });

    if ('id' in paidReservation) {
      const { id, left } = paidReservation;

      return {
        success: true,
        data: { id, left }
      };
    }

    return {
      success: false,
      error: paidReservation
    };
  }
}
