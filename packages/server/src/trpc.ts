import { inferAsyncReturnType, initTRPC } from '@trpc/server';

const createContext = () => ({
  // ... your context here
  // e.g. db connection, session, etc
});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const { router } = t;

export const publicProcedure = t.procedure;
