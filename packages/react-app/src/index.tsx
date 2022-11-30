import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from 'containers/Home';
import Layout from 'containers/Layout';

import './index.scss';

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

root.render(
  <StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </StrictMode>,
);
