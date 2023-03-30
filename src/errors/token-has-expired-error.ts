import { AppError } from './app-error'

export class TokenExpiredError extends AppError {
  constructor() {
    super('Token has expired.', 498)
  }
}
