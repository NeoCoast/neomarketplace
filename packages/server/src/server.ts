import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';

import { appRouter } from './routers/app';

const app = express();
const port = 3001;

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const createContext = () => ({}); // no context

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get('/', (req, res) => {
  res.json({ foo: 'bar' });
});

app.listen(port, () => {
  console.log(`Express server app listening at http://localhost:${port}`);
});
