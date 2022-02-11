import { Request, Response } from 'express';

import { MongodbParkingRepository } from '../../../application/repositories/mongodb/parking';
import { PaymentDTO, PaymentId } from './dto';
import { PaymentUseCase } from './useCase';

export class PaymentController {
  constructor(/*private useCase: IUseCase<PaymentDTO & PaymentId, PaymentResponse, PaymentError>*/) {
    /** */
  }
  async handle(req: Request<PaymentDTO, null, PaymentId>, res: Response) {
    const repository = new MongodbParkingRepository();
    const useCase = new PaymentUseCase(repository);

    const data = { ...req.params, ...req.body };

    const result = await useCase.execute(data);

    if (result.success) {
      return res.status(200).json({ data: result.data });
    }

    throw result.error;
  }
}
