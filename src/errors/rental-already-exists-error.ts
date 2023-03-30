import { AppError } from './app-error'

export class RentalAlreadyExistsError extends AppError {
  constructor() {
    super('There is already a rental in this date.', 409)
  }
}
