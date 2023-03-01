import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import { UserType } from 'types/user';
import { users } from 'data/mockedData';

import UserContext from 'context';

import routes from 'constants/routes';

import Home from 'containers/Home';
import MyPurchased from 'containers/MyPurchased';
import MyListing from 'containers/MyListing';
import Layout from 'containers/Layout';
import NewProduct from 'containers/NewProduct';
import ItemView from 'containers/ItemView';
import NotFound from 'containers/NotFound';
import EditProduct from 'containers/EditProduct';

import './index.scss';

const Router = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: '',
    image: '',
  } as UserType);
  const [usersList, setUsersList] = useState<UserType[]>([]);

  const contextValue = useMemo(
    () => ({ selectedUser, setSelectedUser, usersList }),
    [selectedUser, usersList],
  );

  useEffect(() => {
    setSelectedUser(users[3]); // TO DO: real backend request

    setUsersList(users);
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
            <Route path={routes.myPurchased} element={<MyPurchased />} />
            <Route path={routes.myListing} element={<MyListing />} />
            <Route path={routes.newProduct} index element={<NewProduct />} />
            <Route path={routes.editProduct} index element={<EditProduct />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
