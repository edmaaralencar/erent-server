import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { InMemoryRentalsRepository } from '@/repositories/in-memory/in-memory-rentals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { GetRentalByPaymentIntentIdUseCase } from './get-rental-by-id'

let rentalsRepository: InMemoryRentalsRepository
let propertiesRepository: InMemoryPropertiesRepository
let usersRepository: InMemoryUsersRepository
let sut: GetRentalByPaymentIntentIdUseCase

describe('Fetch Rentals By Payment Intent Id Use Case', () => {
  beforeEach(async () => {
    rentalsRepository = new InMemoryRentalsRepository()
    usersRepository = new InMemoryUsersRepository()
    propertiesRepository = new InMemoryPropertiesRepository()
    sut = new GetRentalByPaymentIntentIdUseCase(rentalsRepository)
  })

  it('should be able to get a property by a payment intent id', async () => {
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

    const oldRental = await rentalsRepository.create({
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
    const { rental } = await sut.execute({
      paymentIntentId: oldRental.payment_intent_id,
    })

    expect(rental).toEqual(
      expect.objectContaining({
        payment_intent_id: '1231321',
      }),
    )
  })

  it('should not be able to get a property with unkown payment intent id', async () => {
    await expect(() =>
      sut.execute({
        paymentIntentId: '1231313',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
