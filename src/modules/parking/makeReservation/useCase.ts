import { Result } from '../../../application/domain/models/Result';
import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { MakeReservationDTO, MakeReservationResponse } from './dto';
import { MakeReservationError } from './error';

export const makeReservationUseCase = (repository: IParkingRepository) => ({
  execute: async (dto: MakeReservationDTO): Promise<Result<MakeReservationResponse, MakeReservationError>> => {
    const regex = /^[a-zA-Z]{3}-[0-9]{4}$/;
    const validatedPlate = regex.test(dto.plate);

    if (!validatedPlate) {
      return {
        success: false,
        error: MakeReservationError.invalidPlate()
      };
    }

    const reservationCreated = await repository.create(dto);

    if ('id' in reservationCreated) {
      // const { id } = reservationCreated;

      return {
        success: true,
        data: reservationCreated
      };
    }

    return {
      success: false,
      error: reservationCreated
    };
  }
});
