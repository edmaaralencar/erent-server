import { InMemoryStorageProvider } from '@/providers/StorageProvider/implementations/InMemoryStorageProvider'
import { InMemoryOptionsRepository } from '@/repositories/in-memory/in-memory-options-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CreateOptionUseCase } from './create-option'

let optionsRepository: InMemoryOptionsRepository
let storageProvider: InMemoryStorageProvider
let sut: CreateOptionUseCase

describe('Create Option Use Case', () => {
  beforeEach(async () => {
    optionsRepository = new InMemoryOptionsRepository()
    storageProvider = new InMemoryStorageProvider()
    sut = new CreateOptionUseCase(optionsRepository, storageProvider)
  })

  it('should be able to create a option', async () => {
    const { option } = await sut.execute({
      name: 'Cozinha',
      filename: 'coffe-01.png',
    })

    expect(option?.id).toEqual(expect.any(String))
  })
})
