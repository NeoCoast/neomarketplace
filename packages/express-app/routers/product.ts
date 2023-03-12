import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProduct, getAll, getById } from "../dataAccess/product";

export const productRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const product = await getById(id);

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No product with id '${id}'`,
        });
      }
      return product;
    }),
  getAll: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { name } = input;
      const products = await getAll(name);

      if (!products.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No products found`,
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
      })
    )
    .mutation((req) => {
      const owner = 1; // Only 1 seller user
      const product = createProduct({
        product: req.input,
        owner,
      });
      return product;
    }),
});
