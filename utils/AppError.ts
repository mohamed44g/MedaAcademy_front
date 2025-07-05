// AppError
export class AppError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "AppError";
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
