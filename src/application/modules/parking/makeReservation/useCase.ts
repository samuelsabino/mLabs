import { Result } from '../../../domain/models/Result';
import { IParkingRepository } from '../../../domain/repositories/parking';
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
      const { id, plate, time } = reservationCreated;
      return {
        success: true,
        data: { id, plate, time }
      };
    }

    return {
      success: false,
      error: reservationCreated
    };
  }
});
