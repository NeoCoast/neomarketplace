import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import {
  createProduct,
  getAll,
  getAllMyPurchased,
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
  getAll: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { name } = input;
      const products = await getAll(name);

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
        name: z.string(),
        description: z.string(),
        image: z.string().optional(),
        price: z.number(),
      }),
    )
    .mutation((req) => {
      const owner = 1; // Only 1 seller user
      const product = createProduct({
        product: req.input,
        owner,
      });
      return product;
    }),
  buyProduct: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        buyerId: z.number(),
      }),
    )
    .mutation(async ({ input: { productId, buyerId } }) => {
      const product = await getById(productId);

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with id '${productId}'`,
        });
      }

      if (product.buyerId || product.status === 'Inactive') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with id '${productId}' was already sold`,
        });
      }

      product.buyerId = buyerId;
      product.status = 'Inactive';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { owner, buyer, ...updatedProduct } = product;

      return updateProduct(productId, updatedProduct);
    }),
  getMyPurchasedProducts: publicProcedure
    .input(
      z.object({
        buyerId: z.number(),
      }),
    )
    .query(async ({ input: { buyerId } }) => {
      const products = await getAllMyPurchased(buyerId);

      if (!products.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No products found',
        });
      }

      return products;
    }),
});
