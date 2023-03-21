import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import {
  createProduct,
  getAll,
  getAllMyPurchased,
  getById,
  updateProduct,
  getMyListing,
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
  getMyListing: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      }),
    )
    .query(async ({ input: { userId } }) => {
      const products = await getMyListing(userId);

      if (!products.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No products found',
        });
      }

      return products;
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
