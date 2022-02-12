import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { MakeReservationDTO } from './dto';
import { MakeReservationUseCase } from './useCase';

export class MakeReservationController {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async handle(req: Request<null, null, MakeReservationDTO>, res: Response) {
    const useCase = new MakeReservationUseCase(this.repository);
    const data = req.body;
    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(201).json({ data: result.data });
    }

    throw result.error;
  }
}
