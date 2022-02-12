import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { RemoveReservationDTO } from './dto';
import { removeReservationUseCase } from './useCase';

export const removeReservationController = (repository: IParkingRepository) => ({
  handle: async (req: Request<RemoveReservationDTO>, res: Response) => {
    const useCase = removeReservationUseCase(repository);

    const data = req.params;

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
});
