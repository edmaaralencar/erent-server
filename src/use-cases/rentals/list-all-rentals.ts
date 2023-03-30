import {
  RentalsRepository,
  RentalWithPropertyAndUser,
} from '@/repositories/rentals-repository'

interface IRequest {
  page: number
}

interface IResponse {
  rentals: RentalWithPropertyAndUser[]
  totalCount: number
}

export class ListAllRentalsUseCase {
  constructor(private rentalsRepository: RentalsRepository) {}

  async execute({ page }: IRequest): Promise<IResponse> {
    const totalCount = await this.rentalsRepository.count()
    const rentals = await this.rentalsRepository.findMany(page)

    return {
      rentals,
      totalCount,
    }
  }
}
