import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindByDataParams, RentalsRepository } from '../rentals-repository'

export class PrismaRentalsRepository implements RentalsRepository {
  async findMany(page: number) {
    const rentals = await prisma.rental.findMany({
      include: {
        property: true,
        user: true,
      },
      take: 9,
      skip: (page - 1) * 9,
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    })

    return rentals
  }

  async findManyByPropertyId(propertyId: string) {
    const rentals = await prisma.rental.findMany({
      where: {
        property_id: propertyId,
      },
    })

    return rentals
  }

  async findManyByPropertyIdAndUserId(propertyId: string, userId: string) {
    const rentals = await prisma.rental.findMany({
      where: {
        property_id: propertyId,
        user_id: userId,
      },
    })

    return rentals
  }

  async findByData(data: FindByDataParams) {
    const rental = await prisma.rental.findFirst({
      where: {
        check_in: data.check_in,
        checkout: data.checkout,
        property_id: data.property_id,
      },
    })

    if (!rental) {
      return null
    }

    return rental
  }

  async findByPaymentIntentId(paymentIntentId: string) {
    const rental = await prisma.rental.findFirst({
      where: {
        payment_intent_id: paymentIntentId,
      },
      include: {
        property: {
          include: {
            images: true,
          },
        },
      },
    })

    if (!rental) {
      return null
    }

    return rental
  }

  async findManyByUserId(userId: string) {
    const rentals = await prisma.rental.findMany({
      where: {
        user_id: userId,
      },
      include: {
        property: {
          include: {
            images: true,
          },
        },
      },
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    })

    return rentals
  }

  async create(data: Prisma.RentalUncheckedCreateInput) {
    const rental = await prisma.rental.create({
      data: {
        total: data.total,
        property_id: data.property_id,
        user_id: data.user_id,
        card_brand: data.card_brand,
        card_last4: data.card_last4,
        check_in: data.check_in,
        checkout: data.checkout,
        status: data.status,
        payment_intent_id: data.payment_intent_id,
      },
    })

    return rental
  }

  async count() {
    const rentalsCount = await prisma.rental.count()

    return rentalsCount
  }
}
