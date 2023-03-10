import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
      buyer: true,
    },
  })

  return product;
};

export const getAll = async (filter?: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: filter,
        mode: 'insensitive',
      },
      status: 'Active',
    },
    include: {
      owner: true,
      buyer: true,
    },
  })

  return products;
};

export const deleteProduct = async (id: number) => {
  const product = await prisma.product.delete({
    where: {
      id,
    }
  })

  return product;
};


export const createProduct = async (product: Prisma.ProductCreateInput) => {
  const createdProduct = await prisma.product.create({data: product})

  return createdProduct;
};

export const updateProdcut = async (id: number, product: Prisma.ProductUpdateInput) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: product,
  })

  return updatedProduct;
};
