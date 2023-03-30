import { AppError } from './app-error'

export class CantRentThisPropertyError extends AppError {
  constructor() {
    super('You cant rate a property that you have not rented.', 405)
  }
}
