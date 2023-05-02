import { hash } from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      name: 'Admin',
      isAdmin: true,
      password_hash: await hash('12345678', 8),
    },
  })

  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
