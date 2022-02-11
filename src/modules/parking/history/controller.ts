import { Request, Response } from 'express';

import { FakeParkingRepository } from '../../../application/repositories/fake/parking';
import { HistoryDTO } from './dto';
import { HistoryUseCase } from './useCase';

export class HistoryController {
  constructor(/*private useCase: IUseCase<HistoryDTO, HistoryResponse, HistoryError>*/) {
    /** */
  }

  async handle(req: Request<HistoryDTO>, res: Response) {
    const repository = new FakeParkingRepository();
    const useCase = new HistoryUseCase(repository);

    const data = req.params;

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
}
