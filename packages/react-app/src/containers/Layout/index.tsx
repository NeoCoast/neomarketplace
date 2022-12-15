import React, {
  ReactElement,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import UsersDropdown from 'components/UsersDropdown';

import Arrow from 'assets/Arrow.svg';
import NeoMarketplace from 'assets/NeoMarketplace.svg';

import UserContext, { userType } from 'context';

import './styles.scss';

type LayoutProps = {
  children?: ReactElement | null,
}

const Layout = ({ children } : LayoutProps) => {
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
          <div className="layout_header_user-container">
            <button onClick={() => setIsOpenUserMenu(!isOpenUserMenu)} className="layout_header_user">
              <img src={selectedUser?.picture} alt="User Avatar" className="layout_header_user_avatar" />
              {selectedUser?.name}
              <img
                src={Arrow}
                className={cn('layout_header_user_arrow', { 'layout_header_user_arrow-down': !isOpenUserMenu })}
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
      {children}
    </div>
  );
};

export default Layout;
