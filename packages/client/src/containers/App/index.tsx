import React, { ReactNode } from 'react';

type AppProps = { children : ReactNode }

const App = ({ children } : AppProps) => (
  <div>
    { children }
  </div>
);

export default App;
