import { MongodbParkingRepository } from '../../../application/repositories/mongodb/parking';
import { Request, Response } from 'express';

import { RemoveReservationDTO } from './dto';
import { RemoveReservationUseCase } from './useCase';

export class RemoveReservationController {
  constructor(/*private useCase: IUseCase<RemoveReservationDTO, RemoveReservationResponse, RemoveReservationError>*/) {
    /** */
  }

  async handle(req: Request<RemoveReservationDTO>, res: Response) {
    const repository = new MongodbParkingRepository();
    const useCase = new RemoveReservationUseCase(repository);

    const data = req.params;

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
}
