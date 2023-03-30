import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { PropertiesRepository } from '@/repositories/properties-repository'
import {
  RatingsRepository,
  RatingWithUser,
} from '@/repositories/ratings-repository'

interface IRequest {
  propertyId: string
}

interface IResponse {
  ratings: RatingWithUser[]
}

export class FetchRatingsByPropertyIdUseCase {
  constructor(
    private ratingsRepository: RatingsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute({ propertyId }: IRequest): Promise<IResponse> {
    const property = await this.propertiesRepository.findById(propertyId)

    if (!property) {
      throw new ResourceNotFoundError()
    }

    const ratings = await this.ratingsRepository.findManyByPropertyId(
      propertyId,
    )

    return { ratings }
  }
}
