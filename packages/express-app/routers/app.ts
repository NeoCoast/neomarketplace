/**
 * This file contains the root router of your tRPC-backend
 */
import { router } from '../trpc';
import { productRouter } from './product';

export const appRouter = router({
  product: productRouter,
  // ToDo add user router
});


export type AppRouter = typeof appRouter;
