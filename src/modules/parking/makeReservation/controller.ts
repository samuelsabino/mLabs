import { Request, Response } from 'express';

import { FakeParkingRepository } from '../../../application/repositories/fake/parking';
import { MakeReservationDTO } from './dto';
import { MakeReservationUseCase } from './useCase';

export class MakeReservationController {
  constructor(/*private useCase: IUseCase<MakeReservationDTO, MakeReservationResponse, MakeReservationError>*/) {
    /** */
  }

  async handle(req: Request<MakeReservationDTO>, res: Response) {
    const repository = new FakeParkingRepository();
    const useCase = new MakeReservationUseCase(repository);

    const data = req.params;

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(201).json({ data: result.data });
    }

    throw result.error;
  }
}
