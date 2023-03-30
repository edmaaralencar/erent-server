import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { RatingsRepository } from '../ratings-repository'

export class PrismaRatingsRepository implements RatingsRepository {
  async findManyByPropertyId(propertyId: string) {
    const ratings = await prisma.rating.findMany({
      where: {
        property_id: propertyId,
      },
      include: {
        user: true,
      },
    })

    return ratings
  }

  async create(data: Prisma.RatingUncheckedCreateInput) {
    const rating = await prisma.rating.create({
      data: {
        user_id: data.user_id,
        property_id: data.property_id,
        value: data.value,
        title: data.title,
        description: data.description,
      },
    })

    return rating
  }
}
