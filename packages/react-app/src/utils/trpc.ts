import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../express-app/routers/app';

export default createTRPCReact<AppRouter>();
