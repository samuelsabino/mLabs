import { Result } from '../../application/domain/models';

export interface IUseCase<Data, Response, E = Error> {
  execute: (data: Data) => Promise<Result<Response, E>>;
}
