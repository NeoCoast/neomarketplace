

import { productRouter } from './product';
import { userRouter } from './user';
import { router } from '../trpc';

// root router to call
export const appRouter = router({
  product: productRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
