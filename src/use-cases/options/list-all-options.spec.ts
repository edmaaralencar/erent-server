import { InMemoryOptionsRepository } from '@/repositories/in-memory/in-memory-options-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { ListAllOptionsUseCase } from './list-all-options'

let optionsRepository: InMemoryOptionsRepository
let sut: ListAllOptionsUseCase

describe('List All Options Use Case', () => {
  beforeEach(async () => {
    optionsRepository = new InMemoryOptionsRepository()
    sut = new ListAllOptionsUseCase(optionsRepository)
  })

  it('should be able to create a option', async () => {
    await optionsRepository.create({
      name: 'Cozinha',
      filename: 'coffe-01.png',
    })

    const { options } = await sut.execute()

    expect(options).toEqual([
      expect.objectContaining({
        name: 'Cozinha',
      }),
    ])
  })
})
