import React, { useEffect, useMemo, useState } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import UserContext from 'context';

import { UserType } from 'types/user';
import routes from 'constants/routes';

import Home from 'containers/Home';
import Layout from 'containers/Layout';
import ItemView from 'containers/ItemView';
import NotFound from 'containers/NotFound';

import './index.scss';

const Router = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: '',
    picture: '',
  } as UserType);
  const [usersList, setUsersList] = useState<UserType[]>([]);

  const contextValue = useMemo(
    () => ({ selectedUser, setSelectedUser, usersList }),
    [selectedUser, usersList],
  );

  useEffect(() => {
    setSelectedUser({
      id: 1,
      name: 'User Name 1',
      picture: 'https://i.pravatar.cc/150?img=1',
    }); // TO DO: real backend request

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
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.item} element={<ItemView />} />

            <Route path="*" element={<NotFound />} />
            {/* TODO: mejorar not found screen */}
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
