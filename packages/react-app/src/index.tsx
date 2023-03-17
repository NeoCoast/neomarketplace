import React from 'react';
import { createRoot } from 'react-dom/client';

import App from 'containers/App';
import Router from './router';

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <App>
    <Router />
  </App>,
);
