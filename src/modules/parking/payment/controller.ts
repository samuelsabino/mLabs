import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { PaymentDTO, PaymentId } from './dto';
import { paymentUseCase } from './useCase';

export const paymentController = (repository: IParkingRepository) => ({
  handle: async (req: Request<PaymentDTO, null, PaymentId>, res: Response) => {
    const useCase = paymentUseCase(repository);

    const data = { ...req.params, ...req.body };

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
});
