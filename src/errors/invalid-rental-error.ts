import { AppError } from './app-error'

export class InvalidRentalError extends AppError {
  constructor() {
    super('You cant rental when the checkout is before the check-in.')
  }
}
