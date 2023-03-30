import { OptionsRepository } from '@/repositories/options-repository'
import { Option } from '@prisma/client'

interface IResponse {
  options: Option[]
}

export class ListAllOptionsUseCase {
  constructor(private optionsRepository: OptionsRepository) {}

  async execute(): Promise<IResponse> {
    const options = await this.optionsRepository.findMany()

    return {
      options,
    }
  }
}
