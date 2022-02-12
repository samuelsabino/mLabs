export namespace HTTP {
  export interface Request<Body = null | undefined, Params = null | undefined, Query = null | undefined> {
    body: Body;
    params: Params;
    query: Query;
  }

  export interface RequestA<Body = null | undefined, Params = null | undefined, Query = null | undefined> {
    body: Body;
    params: Params;
    query: Query;
  }

  export interface Response<Data, Code = number> {
    response: Data;
    statusCode: Code;
  }
}
