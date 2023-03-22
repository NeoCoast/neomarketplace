import React, { useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import UserContext from 'context';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';
import trpc from 'utils/trpc';

import './styles.scss';

const MyPurchased = () => {
  const { selectedUser } = useContext(UserContext);

  const getProducts = trpc.product.getMyPurchasedProducts.useQuery({
    buyerId: selectedUser?.id || 0,
  });

  if (getProducts.isLoading && !getProducts.isError) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading
        color="#2C3A61"
      />
    );
  }

  return (
    <div className="my-purchased">
      <div>
        <div className="my-purchased__title-container">
          <img
            src={TitleImage}
            alt="My Purchased"
            className="my-purchased__title-img"
          />
          <span className="my-purchased__title">
            My Purchased
          </span>
        </div>

        <ProductList products={getProducts.data || []} />
      </div>
    </div>
  );
};

export default MyPurchased;
