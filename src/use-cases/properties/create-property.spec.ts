import { InMemoryStorageProvider } from '@/providers/StorageProvider/implementations/InMemoryStorageProvider'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePropertyUseCase } from './create-property'

let propertiesRepository: InMemoryPropertiesRepository
let storageProvider: InMemoryStorageProvider
let sut: CreatePropertyUseCase

describe('Create Property Use Case', () => {
  beforeEach(async () => {
    propertiesRepository = new InMemoryPropertiesRepository()
    storageProvider = new InMemoryStorageProvider()
    sut = new CreatePropertyUseCase(propertiesRepository, storageProvider)
  })

  it('should be able to create a property', async () => {
    const { property } = await sut.execute({
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
      images: [
        {
          filename: 'image-01.png',
        },
      ],
      options: [{ id: '123' }],
    })

    expect(property?.id).toEqual(expect.any(String))
  })
})
