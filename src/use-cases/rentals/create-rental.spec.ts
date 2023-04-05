import { InvalidRentalError } from '@/errors/invalid-rental-error'
import { RentalAlreadyExistsError } from '@/errors/rental-already-exists-error'
import { RentalIsInPastError } from '@/errors/rental-is-in-past-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-properties-repository'
import { InMemoryRentalsRepository } from '@/repositories/in-memory/in-memory-rentals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { calculateDifferenceBetweenDates } from '@/utils/date'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateRentalUseCase } from './create-rental'

let rentalsRepository: InMemoryRentalsRepository
let propertiesRepository: InMemoryPropertiesRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateRentalUseCase

describe('Create Rental Use Case', () => {
  beforeEach(() => {
    rentalsRepository = new InMemoryRentalsRepository()
    propertiesRepository = new InMemoryPropertiesRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateRentalUseCase(rentalsRepository, propertiesRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a rental', async () => {
    vi.setSystemTime(new Date(2023, 3, 4))

    const property = await propertiesRepository.create({
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

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    const { rental } = await sut.execute({
      checkIn: new Date(2023, 3, 5),
      checkout: new Date(2023, 3, 7),
      propertyId: property.id,
      userId: user.id,
      paymentIntentId: '1231321',
      status: 'completed',
      amount: 10000,
    })

    expect(rental.id).toEqual(expect.any(String))
  })

  it('should not be able to create a rental with wrong property id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        checkIn: new Date(2023, 3, 4),
        checkout: new Date(2023, 3, 6),
        propertyId: 'wrong-property-id',
        userId: user.id,
        paymentIntentId: '1231321',
        status: 'completed',
        amount: 10000,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not able to rent a house in a date in the past', async () => {
    vi.setSystemTime(new Date(2023, 3, 21))

    const property = await propertiesRepository.create({
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

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        checkIn: new Date(2023, 3, 5),
        checkout: new Date(2023, 3, 7),
        propertyId: property.id,
        userId: user.id,
        paymentIntentId: '1231321',
        status: 'completed',
        amount: 10000,
      }),
    ).rejects.toBeInstanceOf(RentalIsInPastError)
  })

  it('should not able to rent when there is a rental in the same date', async () => {
    const property = await propertiesRepository.create({
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

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    await rentalsRepository.create({
      total:
        calculateDifferenceBetweenDates(
          '2023-04-23T03:00:00.000',
          '2023-04-29T03:00:00.000',
        ) * property?.daily_price,
      property_id: property.id,
      user_id: user.id,
      card_brand: 'VISA',
      card_last4: '4444',
      check_in: '2023-04-23T03:00:00.000',
      checkout: '2023-04-29T03:00:00.000',
      status: 'pending',
      payment_intent_id: '12345678',
    })

    await expect(() =>
      sut.execute({
        checkIn: new Date('2023-04-26T03:00:00.000'),
        checkout: new Date('2023-04-31T03:00:00.000'),
        propertyId: property.id,
        userId: user.id,
        paymentIntentId: '1231321',
        status: 'completed',
        amount: 10000,
      }),
    ).rejects.toBeInstanceOf(RentalAlreadyExistsError)
  })

  it('should not be able to rent a house when there is already a rent in the time', async () => {
    const property = await propertiesRepository.create({
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

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    await rentalsRepository.create({
      total:
        calculateDifferenceBetweenDates(
          '2023-04-26T03:00:00.000',
          '2023-04-31T03:00:00.000',
        ) * property?.daily_price,
      property_id: property.id,
      user_id: user.id,
      card_brand: 'VISA',
      card_last4: '4444',
      check_in: '2023-04-26T03:00:00.000',
      checkout: '2023-04-31T03:00:00.000',
      status: 'pending',
      payment_intent_id: '12345678',
    })

    await expect(() =>
      sut.execute({
        checkIn: new Date('2023-04-26T03:00:00.000'),
        checkout: new Date('2023-04-31T03:00:00.000'),
        propertyId: property.id,
        userId: user.id,
        paymentIntentId: '1231321',
        status: 'completed',
        amount: 10000,
      }),
    ).rejects.toBeInstanceOf(RentalAlreadyExistsError)
  })

  it('should not be able to rent when the check in date is after the checkout date', async () => {
    vi.setSystemTime(new Date(2023, 2, 21))

    const property = await propertiesRepository.create({
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

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: '123456',
    })

    await expect(() =>
      sut.execute({
        checkout: new Date(2023, 3, 5),
        checkIn: new Date(2023, 3, 7),
        propertyId: property.id,
        userId: user.id,
        paymentIntentId: '1231321',
        status: 'completed',
        amount: 10000,
      }),
    ).rejects.toBeInstanceOf(InvalidRentalError)
  })
})
