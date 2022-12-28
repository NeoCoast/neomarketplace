import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const product = await prisma.product.create({
    data: {
      name: 'Play station',
      price: 433.3,
      description: 'Play stationt 5 1024 gb silver',
      image: 'test',
      userId: alice.id,
    }
  })
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
