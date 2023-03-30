import { prisma } from '@/lib/prisma'
import {
  PropertyCreateInput,
  PropertiesRepository,
  FindManyByFilterParams,
  CountWithFiltersParams,
} from '../properties-repository'

export class PrismaPropertiesRepository implements PropertiesRepository {
  async findMany(page: number) {
    const properties = await prisma.property.findMany({
      include: {
        images: true,
        options: true,
        ratings: true,
      },
      take: 9,
      skip: (page - 1) * 9,
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    })

    return properties
  }

  async findManyByFilter(data: FindManyByFilterParams) {
    const properties = await prisma.property.findMany({
      where: {
        ...(data.region !== '' ? { region: data.region } : {}),
        ...(data.rooms > 0 ? { rooms: data.rooms } : {}),
        ...(data.dailyPrice > 0
          ? { daily_price: { lte: data.dailyPrice } }
          : {}),
      },
      include: {
        images: true,
        options: true,
        ratings: true,
      },
      take: 9,
      skip: (data.page - 1) * 9,
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    })

    return properties
  }

  async findById(id: string) {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        options: true,
        ratings: true,
      },
    })

    return property
  }

  async delete(id: string) {
    await prisma.property.delete({
      where: {
        id,
      },
    })
  }

  async create(data: PropertyCreateInput) {
    const property = await prisma.property.create({
      data: {
        name: data.name,
        description: data.description,
        city: data.city,
        region: data.region,
        daily_price: data.daily_price,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        size: data.size,
        capacity: data.capacity,
        images: {
          createMany: {
            data: data.images,
          },
        },
        options: {
          connect: data.options.map((option) => ({ id: option.id })),
        },
      },
    })

    return property
  }

  async count() {
    const propertiesCount = await prisma.property.count()

    return propertiesCount
  }

  async countWithFilters(data: CountWithFiltersParams) {
    let totalCountWithFilter

    if (data.region !== '' || data.rooms > 0 || data.dailyPrice > 0) {
      const properties = await prisma.property.findMany({
        where: {
          ...(data.region !== '' ? { region: data.region } : {}),
          ...(data.rooms > 0 ? { rooms: data.rooms } : {}),
          ...(data.dailyPrice > 0
            ? { daily_price: { lte: data.dailyPrice } }
            : {}),
        },
      })
      totalCountWithFilter = properties.length
    }

    return totalCountWithFilter
  }
}
