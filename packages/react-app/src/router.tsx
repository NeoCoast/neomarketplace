import React, { useEffect, useMemo, useState } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import UserContext, { userType } from 'context';

import routes from 'constants/routes';

import Home from 'containers/Home';
import MyPurchased from 'containers/MyPurchased';
import MyListing from 'containers/MyListing';
import Layout from 'containers/Layout';

import './index.scss';

const Router = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: '',
    picture: '',
  } as userType);

  const contextValue = useMemo(
    () => ({ selectedUser, setSelectedUser }),
    [selectedUser, setSelectedUser],
  );

  useEffect(() => {
    setSelectedUser({
      id: 1,
      name: 'User Name 1',
      picture: 'https://i.pravatar.cc/150?img=1',
    }); // TO DO: real backend request
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.myPurchased} element={<MyPurchased />} />
            <Route path={routes.myListing} element={<MyListing />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
