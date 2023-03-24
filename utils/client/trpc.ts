// ...client/src/utils/trpc.ts

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@server/routers/app';

export default createTRPCReact<AppRouter>();
