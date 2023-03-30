import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { ListAllPropertiesUseCase } from './list-all-properties'

let propertiesRepository: InMemoryPropertiesRepository
let sut: ListAllPropertiesUseCase

describe('List All Properties Use Case', () => {
  beforeEach(async () => {
    propertiesRepository = new InMemoryPropertiesRepository()
    sut = new ListAllPropertiesUseCase(propertiesRepository)
  })

  it('should be able to list all properties', async () => {
    for (let i = 1; i <= 11; i++) {
      await propertiesRepository.create({
        name: `Casa na praia ${i}`,
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
    }

    const { properties } = await sut.execute({ page: 2 })

    expect(properties).toHaveLength(2)
    expect(properties).toEqual([
      expect.objectContaining({
        name: 'Casa na praia 10',
        images: [
          expect.objectContaining({
            filename: 'image-01.png',
          }),
        ],
      }),
      expect.objectContaining({
        name: 'Casa na praia 11',
        images: [
          expect.objectContaining({
            filename: 'image-01.png',
          }),
        ],
      }),
    ])
  })
})
