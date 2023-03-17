import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getAll, getById } from '../dataAccess/user';

export const userRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await getById(id);

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }

      return user;
    }),
  getAll: publicProcedure
    .query(async () => {
      const users = await getAll();

      if (!users.length) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No users found',
        });
      }

      return users;
    }),
});
