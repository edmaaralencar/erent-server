import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { GetPropertyUseCase } from './get-property'

let propertiesRepository: InMemoryPropertiesRepository
let sut: GetPropertyUseCase

describe('Get Property Use Case', () => {
  beforeEach(async () => {
    propertiesRepository = new InMemoryPropertiesRepository()
    sut = new GetPropertyUseCase(propertiesRepository)
  })

  it('should be able to get a property by its id', async () => {
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

    const { property } = await sut.execute({ id: '1' })

    expect(property.id).toEqual('1')
  })

  it('should not be able to get a property with wrong id', async () => {
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

    await expect(() => sut.execute({ id: '2' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
