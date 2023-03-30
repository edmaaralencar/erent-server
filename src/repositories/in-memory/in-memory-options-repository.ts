import { Option, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OptionsRepository } from '../options-repository'

export class InMemoryOptionsRepository implements OptionsRepository {
  public items: Option[] = []

  async findMany() {
    return this.items
  }

  async findById(id: string) {
    const option = this.items.find((item) => item.id === id)

    if (!option) {
      return null
    }

    return option
  }

  async delete(id: string) {
    const optionIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(optionIndex, 1)
  }

  async create(data: Prisma.OptionCreateInput) {
    const option = {
      id: data.id ?? randomUUID(),
      name: data.name,
      filename: data.filename,
      created_at: new Date(),
    }

    this.items.push(option)

    return option
  }
}
