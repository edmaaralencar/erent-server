import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import {
  RentalsRepository,
  RentalWithProperty,
} from '@/repositories/rentals-repository'

interface IRequest {
  paymentIntentId: string
}

interface IResponse {
  rental: RentalWithProperty
}

export class GetRentalByPaymentIntentIdUseCase {
  constructor(private rentalsRepository: RentalsRepository) {}

  async execute({ paymentIntentId }: IRequest): Promise<IResponse> {
    const rental = await this.rentalsRepository.findByPaymentIntentId(
      paymentIntentId,
    )

    if (!rental) {
      throw new ResourceNotFoundError()
    }

    return {
      rental,
    }
  }
}
