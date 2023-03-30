import { Option, Prisma } from '@prisma/client'

export interface OptionsRepository {
  findMany(): Promise<Option[]>
  findById(id: string): Promise<Option | null>
  delete(id: string): Promise<void>
  create(data: Prisma.OptionCreateInput): Promise<Option>
}
