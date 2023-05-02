import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IStorageProvider } from '@/providers/StorageProvider/IStorageProvider'
import { OptionsRepository } from '@/repositories/options-repository'

interface IRequest {
  id: string
}

export class DeleteOptionUseCase {
  constructor(
    private optionsRepository: OptionsRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const option = await this.optionsRepository.findById(id)

    if (!option) {
      throw new ResourceNotFoundError()
    }

    await this.optionsRepository.delete(option.id)

    await this.storageProvider.delete(option.filename, 'options')
  }
}
