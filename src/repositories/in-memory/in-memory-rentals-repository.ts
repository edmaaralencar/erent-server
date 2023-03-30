import { Prisma, Rental } from '@prisma/client'
import { randomUUID } from 'crypto'
import {
  FindByDataParams,
  RentalsRepository,
  RentalWithProperty,
  RentalWithPropertyAndUser,
} from '../rentals-repository'

export class InMemoryRentalsRepository implements RentalsRepository {
  public items: Rental[] = []

  async findMany(page: number) {
    return this.items.slice(
      (page - 1) * 9,
      page * 9,
    ) as RentalWithPropertyAndUser[]
  }

  async findByPaymentIntentId(paymentIntentId: string) {
    const rental = this.items.find(
      (item) => item.payment_intent_id === paymentIntentId,
    )

    if (!rental) {
      return null
    }

    return rental as RentalWithProperty
  }

  async findManyByPropertyId(propertyId: string) {
    const rentals = this.items.filter((item) => item.property_id === propertyId)

    return rentals
  }

  async findManyByUserId(userId: string) {
    const rentals = this.items.filter((item) => item.user_id === userId)

    return rentals as RentalWithProperty[]
  }

  async findByData(data: FindByDataParams) {
    const rental = this.items.find(
      (item) =>
        item.check_in === data.check_in &&
        item.checkout === data.checkout &&
        item.property_id === data.property_id,
    )

    if (!rental) {
      return null
    }

    return rental
  }

  async create(data: Prisma.RentalUncheckedCreateInput) {
    const rental = {
      id: data.id ?? randomUUID(),
      check_in: new Date(data.check_in),
      checkout: new Date(data.checkout),
      status: data.status,
      total: data.total,
      payment_intent_id: data.payment_intent_id,
      card_brand: data.card_brand,
      card_last4: data.card_last4,
      property_id: data.property_id,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(rental as RentalWithPropertyAndUser)
    return rental
  }

  async count() {
    return this.items.length
  }
}
