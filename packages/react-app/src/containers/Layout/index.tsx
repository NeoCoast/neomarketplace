import React, { ReactElement } from 'react';

import './styles.scss';

type LayoutProps = {
  children?: ReactElement | null,
}

const Layout = ({ children } : LayoutProps) => (
  <div className="layout">
    <header className="layout_header" />
    {children}
  </div>
);

export default Layout;
