import React, {
  useState,
  useContext,
} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import cn from 'classnames';

import UsersDropdown from 'components/UsersDropdown';

import Arrow from 'assets/Arrow.svg';
import NeoMarketplace from 'assets/NeoMarketplace.svg';

import UserContext from 'context';

import routes from 'constants/routes';

import './styles.scss';
import { defaultAvatar } from 'data/mockedData';

const Layout = () => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const navigate = useNavigate();
  const { selectedUser, usersList } = useContext(UserContext);

  return (
    <div className="layout">
      <header className="layout__header">
        <button className="layout__header__logo" onClick={() => navigate(routes.home)}>
          <img className="layout__header__isotype" src={NeoMarketplace} alt="App Logo" />
          <p>
            NeoMarketplace
          </p>
        </button>
        <div className="layout__header__right">
          <div className="layout__header__menu">
            <button className="layout__header__menu__item" onClick={() => navigate(routes.myListing)}>
              MY LISTING
            </button>
            <button className="layout__header__menu__item" onClick={() => navigate(routes.myPurchased)}>
              MY PURCHASED
            </button>
          </div>
          <div className="layout__header__user-container">
            <button onClick={() => setIsOpenUserMenu(!isOpenUserMenu)} className="layout__header__user">
              <img
                src={defaultAvatar} // todo: add user avatar
                alt="User Avatar"
                className="layout__header__user__avatar"
              />
              {selectedUser?.name}
              <img
                src={Arrow}
                className={cn('layout__header__user__arrow', { 'layout__header__user__arrow--down': !isOpenUserMenu })}
                alt="User menu arrow"
              />
            </button>
            <UsersDropdown
              isOpen={isOpenUserMenu}
              setIsOpen={setIsOpenUserMenu}
              usersList={usersList}
            />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
