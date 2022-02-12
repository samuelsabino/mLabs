import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { RemoveReservationDTO } from './dto';
import { RemoveReservationUseCase } from './useCase';

export class RemoveReservationController {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async handle(req: Request<RemoveReservationDTO>, res: Response) {
    const useCase = new RemoveReservationUseCase(this.repository);

    const data = req.params;

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
}
