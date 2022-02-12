import { FakeParkingRepository } from '../../../application/repositories/fake/parking';
import { Result } from '../../../application/domain/models/Result';
import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { IUseCase } from '../../../application/interfaces/useCase';
import { MakeReservationDTO, MakeReservationResponse } from './dto';
import { MakeReservationError } from './error';

export class MakeReservationUseCase implements IUseCase<MakeReservationDTO, MakeReservationResponse> {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async execute(dto: MakeReservationDTO): Promise<Result<MakeReservationResponse, MakeReservationError>> {
    const regex = /^[a-zA-Z]{3}-[0-9]{4}$/;
    const validatedPlate = regex.test(dto.plate);

    console.log(dto);
    console.log(regex);
    console.log(validatedPlate);
    if (!validatedPlate) {
      return {
        success: false,
        error: MakeReservationError.invalidPlate()
      };
    }

    const reservationCreated = await this.repository.create(dto);

    if ('id' in reservationCreated) {
      const { id } = reservationCreated;

      return {
        success: true,
        data: { id }
      };
    }

    return {
      success: false,
      error: reservationCreated
    };
  }
}
