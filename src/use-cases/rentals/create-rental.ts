import { InvalidRentalError } from '@/errors/invalid-rental-error'
import { RentalAlreadyExistsError } from '@/errors/rental-already-exists-error'
import { RentalIsInPastError } from '@/errors/rental-is-in-past-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { PropertiesRepository } from '@/repositories/properties-repository'
import { RentalsRepository } from '@/repositories/rentals-repository'
import { getDaysArray } from '@/utils/date'
import { Rental } from '@prisma/client'
import dayjs from 'dayjs'

interface IRequest {
  paymentIntentId: string
  checkIn: Date
  checkout: Date
  propertyId: string
  userId: string
  status: string
  amount: number
}

interface IResponse {
  rental: Rental
}

export class CreateRentalUseCase {
  constructor(
    private rentalsRepository: RentalsRepository,
    private propertiesRepository: PropertiesRepository,
  ) {}

  async execute({
    paymentIntentId,
    status,
    checkIn,
    checkout,
    propertyId,
    userId,
    amount,
  }: IRequest): Promise<IResponse> {
    const property = await this.propertiesRepository.findById(propertyId)

    if (!property) {
      throw new ResourceNotFoundError()
    }

    const rentals = await this.rentalsRepository.findManyByPropertyId(
      propertyId,
    )

    const checkInDate = dayjs(checkIn)
    const checkoutDate = dayjs(checkout)

    if (checkInDate.isBefore(new Date()) || checkoutDate.isBefore(new Date())) {
      console.log('erro')
      throw new RentalIsInPastError()
    }

    const daysBetweenDates = getDaysArray(checkIn, checkout)

    for (const rental of rentals) {
      const checkInInTime = rental?.check_in
      const checkOutInTime = rental?.checkout

      checkInInTime.setHours(0, 0, 0, 0)
      checkOutInTime.setHours(0, 0, 0, 0)

      if (
        daysBetweenDates.includes(checkInInTime.getTime()) ||
        daysBetweenDates.includes(checkOutInTime.getTime())
      ) {
        throw new RentalAlreadyExistsError()
      }
    }

    if (checkoutDate.isBefore(checkInDate)) {
      throw new InvalidRentalError()
    }

    const rentalExists = await this.rentalsRepository.findByData({
      check_in: checkIn,
      checkout,
      property_id: property.id,
    })

    if (rentalExists) {
      throw new RentalAlreadyExistsError()
    }

    const rental = await this.rentalsRepository.create({
      total: amount,
      property_id: propertyId,
      user_id: userId,
      card_brand: 'VISA',
      card_last4: '4444',
      check_in: dayjs(checkIn).startOf('date').toDate(),
      checkout: dayjs(checkout).startOf('date').toDate(),
      status,
      payment_intent_id: paymentIntentId,
    })

    return {
      rental,
    }
  }
}
