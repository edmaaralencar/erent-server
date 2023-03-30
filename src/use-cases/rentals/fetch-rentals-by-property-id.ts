import { RentalsRepository } from '@/repositories/rentals-repository'
import { Rental } from '@prisma/client'

interface IRequest {
  propertyId: string
}

interface IResponse {
  rentals: Rental[]
}

export class FetchRentalsByPropertyIdUseCase {
  constructor(private rentalsRepository: RentalsRepository) {}

  async execute({ propertyId }: IRequest): Promise<IResponse> {
    const rentals = await this.rentalsRepository.findManyByPropertyId(
      propertyId,
    )

    return { rentals }
  }
}
