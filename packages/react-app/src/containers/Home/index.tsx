import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductList from 'components/ProductList';

// import { ProductType } from 'types/product';

import './styles.scss';
import trpc from 'utils/trpc';

const Home = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get('name');

  const products = trpc.product.getAll.useQuery({ name: name || '' });

  if (products.isLoading) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading={products.isLoading}
        color="#2C3A61"
      />
    );
  }

  if (!products) {
    return (
      <div>
        No products available.
      </div>
    );
  }

  return (
    <div className="App">
      <ProductList products={products.data} />
    </div>
  );
};

export default Home;
