import { ApplicationError } from '../../application/errors';
import { HTTP } from '../../application/domain/models';
import { IController } from '../../application/interfaces';
import { Request, Response } from 'express';

export const adaptRoute = <ResData, B, P, Q>(controller: IController<ResData, B, P, Q>) => {
  return async (req: Request<P, null, B, Q>, res: Response) => {
    const requestData: HTTP.Request<B, P, Q> = {
      body: req.body,
      params: req.params,
      query: req.query
    };

    const result = await controller.handle(requestData);
    console.log(result);
    return result instanceof ApplicationError
      ? res.status(result.code).json(result.message)
      : res.status(result.statusCode).json(result.response);
  };
};
