import { IStorageProvider } from '@/providers/StorageProvider/IStorageProvider'
import { OptionsRepository } from '@/repositories/options-repository'
import { Option } from '@prisma/client'

interface IRequest {
  name: string
  filename: string
}

interface IResponse {
  option: Option
}

export class CreateOptionUseCase {
  constructor(
    private optionsRepository: OptionsRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ name, filename }: IRequest): Promise<IResponse> {
    const option = await this.optionsRepository.create({ name, filename })

    await this.storageProvider.save(filename, 'options')

    return {
      option,
    }
  }
}
