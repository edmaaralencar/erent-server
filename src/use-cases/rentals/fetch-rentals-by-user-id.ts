import {
  RentalsRepository,
  RentalWithProperty,
} from '@/repositories/rentals-repository'

interface IRequest {
  userId: string
}

interface IResponse {
  rentals: RentalWithProperty[]
}

export class FetchRentalsByUserIdUseCase {
  constructor(private rentalsRepository: RentalsRepository) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const rentals = await this.rentalsRepository.findManyByUserId(userId)

    return { rentals }
  }
}
