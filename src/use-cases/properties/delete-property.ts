import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IStorageProvider } from '@/providers/StorageProvider/IStorageProvider'
import { PropertiesRepository } from '@/repositories/properties-repository'

interface IRequest {
  id: string
}

export class DeletePropertyUseCase {
  constructor(
    private propertiesRepository: PropertiesRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ id }: IRequest) {
    const property = await this.propertiesRepository.findById(id)

    if (!property) {
      throw new ResourceNotFoundError()
    }

    for (const image of property.images) {
      await this.storageProvider.delete(image.filename)
    }

    await this.propertiesRepository.delete(id)
  }
}
