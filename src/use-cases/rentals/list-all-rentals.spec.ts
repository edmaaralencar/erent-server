import { InMemoryRentalsRepository } from '@/repositories/in-memory/in-memory-rentals-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { ListAllRentalsUseCase } from './list-all-rentals'

let rentalsRepository: InMemoryRentalsRepository
let sut: ListAllRentalsUseCase

describe('List All Rentals Use Case', () => {
  beforeEach(async () => {
    rentalsRepository = new InMemoryRentalsRepository()
    sut = new ListAllRentalsUseCase(rentalsRepository)
  })

  it('should be able to list all rentals', async () => {
    for (let i = 1; i <= 11; i++) {
      await rentalsRepository.create({
        check_in: new Date(2023, 3, 5),
        checkout: new Date(2023, 3, 7),
        property_id: `property-${i}`,
        user_id: `user-${i}`,
        payment_intent_id: '1231321',
        status: 'completed',
        total: 10000,
        card_brand: 'visa',
        card_last4: '1234',
      })
    }

    const { rentals } = await sut.execute({ page: 2 })

    expect(rentals).toHaveLength(2)
  })
})
