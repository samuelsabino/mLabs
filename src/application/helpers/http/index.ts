import { HTTP } from '../../../application/domain/models/HTTP';
import { ApplicationError } from '../../errors/application';

export const ok = <T>(data: T): HTTP.Response<T, 200> => ({
  statusCode: 200,
  response: data
});

export const created = <T>(data: T): HTTP.Response<T, 201> => ({
  statusCode: 201,
  response: data
});

export const badRequest = <T extends Error>(error: T): HTTP.Response<T, 400> => ({
  statusCode: 400,
  response: error
});

export const forbidden = <T extends Error>(error: T): HTTP.Response<T, 403> => ({
  statusCode: 403,
  response: error
});

export const serverError = <T extends Error>(error: T): HTTP.Response<T, 500> => ({
  statusCode: 500,
  response: error
});

export const genericError = <T extends ApplicationError, N extends number>(error: T & { code: N }): HTTP.Response<T, N> => ({
  statusCode: error.code,
  response: error
});
