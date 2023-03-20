import React, { useState, useEffect, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import UserContext from 'context';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';
import trpc from 'utils/trpc';

import { ProductType } from 'types/product';

import './styles.scss';

const MyListing = () => {
  const [productsList, setProductList] = useState([] as ProductType[]);
  const { selectedUser } = useContext(UserContext);

  const getProducts = trpc.product.getMyListing.useQuery({
    userId: selectedUser?.id || 0,
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
    <div className="my-listing">
      <div>
        <div className="my-listing__title-container">
          <img src={TitleImage} alt="My Listing" className="my-listing__title-img" />
          <span className="my-listing__title">My Listing</span>
        </div>

        <ProductList products={productsList} />
      </div>
    </div>
  );
};

export default MyListing;
