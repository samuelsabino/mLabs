import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { HistoryDTO } from './dto';
import { historyUseCase } from './useCase';

export const historyController = (repository: IParkingRepository) => ({
  handle: async (req: Request<HistoryDTO>, res: Response) => {
    const useCase = historyUseCase(repository);

    const data = req.params;
    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
});
