import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getById } from '../dataAccess/product';

export const productRouter = router({
  byId: publicProcedure.
    input(z.object({
      id: z.number()
    }),
  ).query(async ({ input }) => {
      const { id  } = input;
      const product = await getById(id);

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with id '${id}'`,
        });
      }
      return product;
  })
  //ToDo add other querys/mutations
});
