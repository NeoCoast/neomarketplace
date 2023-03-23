import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import {
  createProduct,
  getAll,
  getById,
  updateProduct,
} from '../dataAccess/product';

import { router, publicProcedure } from '../trpc';

export const productRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const product = await getById(id);

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with id '${id}'`,
        });
      }

      return product;
    }),
  getAll: publicProcedure.query(async () => {
    const products = await getAll();

    if (!products.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No products found',
      });
    }

    return products;
  }),
  createProduct: publicProcedure
    .input(
      z.object({
        newProduct: z.object({
          name: z.string(),
          description: z.string(),
          image: z.string(),
          price: z.number(),
        }),
        ownerId: z.number(),
      }),
    )
    .mutation((req) => {
      const product = createProduct({
        product: req.input.newProduct,
        owner: req.input.ownerId,
      });
      return product;
    }),
  editProduct: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        newProductData: z.object({
          description: z.string(),
          name: z.string(),
          image: z.string(),
          price: z.number(),
        }),
      }),
    )
    .mutation(async ({ input: { productId, newProductData } }) => {
      let product = await getById(productId);

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with id '${productId}'`,
        });
      }

      product = { ...product, ...newProductData };

      const { owner, buyer, ...updatedProduct } = product;

      return updateProduct(productId, updatedProduct);
    }),
});
