import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { HistoryDTO } from './dto';
import { HistoryUseCase } from './useCase';

export class HistoryController {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async handle(req: Request<HistoryDTO>, res: Response) {
    const useCase = new HistoryUseCase(this.repository);

    const data = req.params;

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
}
