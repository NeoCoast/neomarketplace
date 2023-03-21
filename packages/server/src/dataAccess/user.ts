import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  return user;
};

export const getAll = () => prisma.user.findMany();
