import React, { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { httpBatchLink } from '@trpc/client';

import trpc from 'utils/trpc';

type AppProps = { children : ReactNode }

const App = ({ children } : AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: process.env.REACT_APP_API_BASE_URL || '',
      }),
    ],
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
