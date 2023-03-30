import { CantRentThisPropertyError } from '@/errors/cant-rent-this-property-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UserAlreadyRatedThisPropertyError } from '@/errors/user-already-rated-this-property-error'
import { PropertiesRepository } from '@/repositories/properties-repository'
import { RatingsRepository } from '@/repositories/ratings-repository'
import { RentalsRepository } from '@/repositories/rentals-repository'
import { Rating } from '@prisma/client'

interface IRequest {
  userId: string
  propertyId: string
  value: number
  title: string
  description: string
}

interface IResponse {
  rating: Rating
}

export class CreateRatingUseCase {
  constructor(
    private ratingsRepository: RatingsRepository,
    private propertiesRepository: PropertiesRepository,
    private rentalsRepository: RentalsRepository,
  ) {}

  async execute({
    userId,
    propertyId,
    value,
    title,
    description,
  }: IRequest): Promise<IResponse> {
    const property = await this.propertiesRepository.findById(propertyId)

    if (!property) {
      throw new ResourceNotFoundError()
    }

    const rentals = await this.rentalsRepository.findManyByPropertyIdAndUserId(
      propertyId,
      userId,
    )

    if (!rentals) {
      throw new CantRentThisPropertyError()
    }

    const userHasAlreadyRated = property.ratings.some(
      (rating) => rating.user_id === userId,
    )

    if (userHasAlreadyRated) {
      throw new UserAlreadyRatedThisPropertyError()
    }

    const rating = await this.ratingsRepository.create({
      user_id: userId,
      property_id: propertyId,
      value,
      title,
      description,
    })

    return { rating }
  }
}
