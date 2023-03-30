export class RentalIsInPastError extends Error {
  constructor() {
    super('Cant rent a house in the past.', 401)
  }
}
