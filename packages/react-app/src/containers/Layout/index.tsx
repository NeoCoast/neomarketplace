import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import cn from 'classnames';

import UsersDropdown from 'components/UsersDropdown';

import Arrow from 'assets/Arrow.svg';
import NeoMarketplace from 'assets/NeoMarketplace.svg';

import UserContext, { userType } from 'context';

import './styles.scss';

const Layout = () => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const [usersList, setUsersList] = useState<userType[]>([]);

  const navigate = useNavigate();
  const { selectedUser } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setUsersList([
        {
          id: 1,
          name: 'User Name 1',
          picture: 'https://i.pravatar.cc/150?img=1',
        },
        {
          id: 2,
          name: 'User Name 2',
          picture: 'https://i.pravatar.cc/150?img=2',
        },
        {
          id: 3,
          name: 'User Name 3',
          picture: 'https://i.pravatar.cc/150?img=3',
        },
      ]);
    }, 1000); // TO DO: real backend request
  }, []);

  return (
    <div className="layout">
      <header className="layout__header">
        <button className="layout__header__logo" onClick={() => navigate('/')}>
          <img className="layout__header__isotype" src={NeoMarketplace} alt="App Logo" />
          <p>
            NeoMarketplace
          </p>
        </button>
        <div className="layout__header__right">
          <div className="layout__header__menu">
            <button className="layout__header__menu__item" onClick={() => navigate('/')}>
              {/* TO DO: Add link My listing screen */}
              MY LISTING
            </button>
            <button className="layout__header__menu__item" onClick={() => navigate('/')}>
              {/* TO DO: Add link My purchased screen */}
              MY PURCHASED
            </button>
          </div>
          <div className="layout__header__user-container">
            <button onClick={() => setIsOpenUserMenu(!isOpenUserMenu)} className="layout__header__user">
              <img src={selectedUser?.picture} alt="User Avatar" className="layout__header__user__avatar" />
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
