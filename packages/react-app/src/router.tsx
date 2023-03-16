import React, {
  useMemo,
  useState,
} from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { UserType } from 'types/user';

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
import trpc from 'utils/trpc';

const Router = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: '',
    image: '',
  } as UserType);

  const usersData = trpc.user.getAll.useQuery();

  const contextValue = useMemo(
    () => ({ selectedUser, setSelectedUser, usersList: usersData.isSuccess ? usersData.data : [] }),
    [selectedUser, usersData.isSuccess],
  );

  if (usersData.isLoading) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading={usersData.isLoading}
        color="#2C3A61"
      />
    );
  }

  if (usersData.isError) {
    // TODO: mejorar error screen
    return (
      <div>
        Error loading users.
      </div>
    );
  }

  if (usersData.isSuccess && !selectedUser.id) {
    const user = usersData.data[0];

    setSelectedUser(user);
  }

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
