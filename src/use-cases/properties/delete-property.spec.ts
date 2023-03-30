import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryStorageProvider } from '@/providers/StorageProvider/implementations/InMemoryStorageProvider'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { DeletePropertyUseCase } from './delete-property'

let propertiesRepository: InMemoryPropertiesRepository
let storageProvider: InMemoryStorageProvider
let sut: DeletePropertyUseCase

describe('Delete Property Use Case', () => {
  beforeEach(async () => {
    propertiesRepository = new InMemoryPropertiesRepository()
    storageProvider = new InMemoryStorageProvider()
    sut = new DeletePropertyUseCase(propertiesRepository, storageProvider)
  })

  it('should be able to delete a property and its images', async () => {
    await propertiesRepository.create({
      id: '1',
      name: 'Casa na praia',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odio, laboriosam unde aliquid possimus sed, praesentium qui repudiandae incidunt itaque neque porro numquam perferendis natus et sapiente quibusdam aut vero.',
      city: 'Recife',
      region: 'Nordeste',
      daily_price: 1000,
      rooms: 3,
      bathrooms: 2,
      size: 100,
      capacity: 7,
      images: [{ filename: 'image-01.png' }],
      options: [{ id: 'option-01' }],
    })

    await sut.execute({ id: '1' })

    expect(propertiesRepository.items).toHaveLength(0)
    expect(storageProvider.items).toHaveLength(0)
  })

  it('should not be able to delete a property with wrong id', async () => {
    await expect(() => sut.execute({ id: '1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
