/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const cleanAllData = async () => {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Product" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "_prisma_migrations" CASCADE;');

  await prisma.$executeRawUnsafe('DROP TABLE "Product";');
  await prisma.$executeRawUnsafe('DROP TABLE "User";');
  await prisma.$executeRawUnsafe('DROP TABLE "_prisma_migrations";');

  await prisma.$executeRawUnsafe('DROP SCHEMA "public" CASCADE;');
};

module.exports = (async () => {
  try {
    await cleanAllData();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
