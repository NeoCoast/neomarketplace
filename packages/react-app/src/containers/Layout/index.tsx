import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import UsersDropdown from 'components/UsersDropdown';

import Arrow from 'assets/Arrow.svg';
import NeoMarketplace from 'assets/NeoMarketplace.svg';
import DefaultUser from 'assets/DefaultUser.png';

import './styles.scss';

type LayoutProps = {
  children?: ReactElement | null,
}

const Layout = ({ children } : LayoutProps) => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="layout">
      <header className="layout_header">
        <button className="layout_header_logo" onClick={() => navigate('/')}>
          <img className="layout_header_isotype" src={NeoMarketplace} alt="App Logo" />
          <p>
            NeoMarketplace
          </p>
        </button>
        <div className="layout_header_right">
          <div className="layout_header_menu">
            <button className="layout_header_menu_item" onClick={() => navigate('/')}>
              {/* TO DO: Add link My listing screen */}
              MY LISTING
            </button>
            <button className="layout_header_menu_item" onClick={() => navigate('/')}>
              {/* TO DO: Add link My purchased screen */}
              MY PURCHASED
            </button>
          </div>
          <button onClick={() => setIsOpenUserMenu(!isOpenUserMenu)} className="layout_header_user">
            <img src={DefaultUser} alt="User Avatar" className="layout_header_user_avatar" />
            User Name 1
            <img
              src={Arrow}
              className={cn('layout_header_user_arrow', { 'layout_header_user_arrow-down': !isOpenUserMenu })}
              alt="User menu arrow"
            />
            <UsersDropdown isOpen={isOpenUserMenu} />
          </button>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
