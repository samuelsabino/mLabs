import { IParkingRepository } from '../../../application/domain/repositories/parking';

import { Result } from '../../../application/domain/models/Result';
import { IUseCase } from '../../../application/interfaces/useCase';
import { MakeReservationDTO, MakeReservationResponse } from './dto';
import { MakeReservationError } from './error';

export class MakeReservationUseCase implements IUseCase<MakeReservationDTO, MakeReservationResponse> {
  // private fields = ['plate'];

  constructor(private repository: IParkingRepository) {
    /** */
  }
  // public getMissingParams<T>(data: T, requiredParams: string[]): string {
  //   const missingParams: string[] = [];

  //   if (!data) return requiredParams.join(', ');

  //   requiredParams.forEach((name) => {
  //     if (!Object.keys(data).includes(name)) {
  //       missingParams.push(name);
  //     }
  //   });
  //   return missingParams.join(', ');
  // }

  async execute(dto: MakeReservationDTO): Promise<Result<MakeReservationResponse, MakeReservationError>> {
    // const missingParams = this.getMissingParams(dto, this.fields);

    // if (missingParams) {
    //   return {
    //     success: false,
    //     error: MakeReservationError.missingParams(missingParams)
    //   };
    // }

    const regex = /^[a-zA-Z]{3}-[0-9]{4}$/;
    const validatedPlate = regex.test(dto.plate);

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
