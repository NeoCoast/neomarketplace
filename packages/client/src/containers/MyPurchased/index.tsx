import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import UserContext from 'context';
import { ProductType } from 'types/product';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';
import trpc from 'utils/trpc';

import './styles.scss';

const MyPurchased = () => {
  const [productsList, setProductList] = useState([] as ProductType[]);
  const { selectedUser } = useContext(UserContext);

  const getProducts = trpc.product.getMyPurchasedProducts.useQuery({
    buyerId: selectedUser?.id || 0,
  });

  useEffect(() => {
    if (getProducts.isSuccess && getProducts.data) {
      setProductList(getProducts.data);
    } else if (getProducts.isError) {
      setProductList([]);
    }
  }, [getProducts.isSuccess, getProducts.data, getProducts.isError]);

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
          <img src={TitleImage} alt="My Purchased" className="my-purchased__title-img" />
          <span className="my-purchased__title">My Purchased</span>
        </div>

        <ProductList products={productsList || []} />
      </div>
    </div>
  );
};

export default MyPurchased;
