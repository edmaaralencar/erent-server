import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { JwtProvider } from '@/providers/JwtProvider'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
let jwtProvider: JwtProvider

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    jwtProvider = new JwtProvider()
    sut = new AuthenticateUseCase(usersRepository, jwtProvider)
  })

  it('should be able to authenticate a get a token', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { token } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(token).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@gmail.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
