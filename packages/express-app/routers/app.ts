import { productRouter } from './product';
import { router } from '../trpc';

// root router to call
export const appRouter = router({
  product: productRouter,
});

export type AppRouter = typeof appRouter;
