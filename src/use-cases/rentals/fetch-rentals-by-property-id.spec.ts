import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { InMemoryRentalsRepository } from '@/repositories/in-memory/in-memory-rentals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { FetchRentalsByPropertyIdUseCase } from './fetch-rentals-by-property-id'

let rentalsRepository: InMemoryRentalsRepository
let propertiesRepository: InMemoryPropertiesRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchRentalsByPropertyIdUseCase

describe('Fetch Rentals By Property Id Use Case', () => {
  beforeEach(async () => {
    rentalsRepository = new InMemoryRentalsRepository()
    usersRepository = new InMemoryUsersRepository()
    propertiesRepository = new InMemoryPropertiesRepository()
    sut = new FetchRentalsByPropertyIdUseCase(rentalsRepository)
  })

  it('should be able to get a rental by a property id', async () => {
    const property = await propertiesRepository.create({
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

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    await rentalsRepository.create({
      check_in: new Date(2023, 3, 5),
      checkout: new Date(2023, 3, 7),
      property_id: property.id,
      user_id: user.id,
      payment_intent_id: '1231321',
      status: 'completed',
      total: 10000,
      card_brand: 'visa',
      card_last4: '1234',
    })

    await rentalsRepository.create({
      check_in: new Date(2023, 3, 5),
      checkout: new Date(2023, 3, 7),
      property_id: 'id-error',
      user_id: user.id,
      payment_intent_id: '1231321',
      status: 'completed',
      total: 10000,
      card_brand: 'visa',
      card_last4: '1234',
    })

    const { rentals } = await sut.execute({
      propertyId: property.id,
    })

    expect(rentals).toHaveLength(1)
  })
})
