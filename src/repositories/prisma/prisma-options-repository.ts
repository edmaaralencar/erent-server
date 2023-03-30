import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OptionsRepository } from '../options-repository'

export class PrismaOptionsRepository implements OptionsRepository {
  async findMany() {
    const options = await prisma.option.findMany({})

    return options
  }

  async findById(id: string) {
    const option = await prisma.option.findUnique({
      where: {
        id,
      },
    })

    return option
  }

  async delete(id: string) {
    const option = await prisma.option.delete({
      where: {
        id,
      },
    })

    return option
  }

  async create(data: Prisma.OptionCreateInput) {
    const option = await prisma.option.create({
      data,
    })

    return option
  }
}
