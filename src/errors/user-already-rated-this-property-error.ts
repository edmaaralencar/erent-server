import { AppError } from './app-error'

export class UserAlreadyRatedThisPropertyError extends AppError {
  constructor() {
    super(`You've already rated this property.`, 405)
  }
}
