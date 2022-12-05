import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import routes from 'constants/routes';

import Home from 'containers/Home';
import Layout from 'containers/Layout';

import './index.scss';

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={routes.home} element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
