export abstract class ApplicationError extends Error {
  public readonly code: number;

  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }
}
