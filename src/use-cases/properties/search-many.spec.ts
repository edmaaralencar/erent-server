import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { SearchManyUseCase } from './search-many'

let propertiesRepository: InMemoryPropertiesRepository
let sut: SearchManyUseCase

describe('Search Many Use Case', () => {
  beforeEach(async () => {
    propertiesRepository = new InMemoryPropertiesRepository()
    sut = new SearchManyUseCase(propertiesRepository)
  })

  it('should be able to search properties by region', async () => {
    await propertiesRepository.create({
      name: `Casa na praia 1`,
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
    await propertiesRepository.create({
      name: `Casa na praia 1`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime odio, laboriosam unde aliquid possimus sed, praesentium qui repudiandae incidunt itaque neque porro numquam perferendis natus et sapiente quibusdam aut vero.',
      city: 'Recife',
      region: 'Sudeste',
      daily_price: 1000,
      rooms: 3,
      bathrooms: 2,
      size: 100,
      capacity: 7,
      images: [{ filename: 'image-01.png' }],
      options: [{ id: 'option-01' }],
    })

    const { properties } = await sut.execute({
      page: 1,
      region: 'Nordeste',
      dailyPrice: 0,
      rooms: 0,
    })

    expect(properties).toHaveLength(1)
    expect(properties).toEqual([
      expect.objectContaining({
        region: 'Nordeste',
      }),
    ])
  })
})
