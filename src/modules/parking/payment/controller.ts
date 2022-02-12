import { Request, Response } from 'express';

import { IParkingRepository } from '../../../application/domain/repositories/parking';
import { FakeParkingRepository } from '../../../application/repositories/fake/parking/repository';
import { PaymentDTO, PaymentId } from './dto';
import { PaymentUseCase } from './useCase';

export class PaymentController {
  constructor(private repository: IParkingRepository = new FakeParkingRepository()) {
    /** */
  }

  async handle(req: Request<PaymentDTO, null, PaymentId>, res: Response) {
    const useCase = new PaymentUseCase(this.repository);

    const data = { ...req.params, ...req.body };

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
}
