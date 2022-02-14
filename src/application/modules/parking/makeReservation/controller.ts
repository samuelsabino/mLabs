import { Request, Response } from 'express';

import { IParkingRepository } from '../../../domain/repositories/parking';
import { MakeReservationDTO } from './dto';
import { makeReservationUseCase } from './useCase';

export const makeReservationController = (repository: IParkingRepository) => ({
  handle: async (req: Request<unknown, unknown, MakeReservationDTO>, res: Response) => {
    const useCase = makeReservationUseCase(repository);
    const data = req.body;
    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(201).json({ data: result.data });
    }

    throw result.error;
  }
});
