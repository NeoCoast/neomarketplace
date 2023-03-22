import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductList from 'components/ProductList';

import trpc from 'utils/trpc';

import './styles.scss';

const Home = () => {
  const products = trpc.product.getAll.useQuery();

  if (products.isLoading && !products.isError) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading={products.isLoading}
        color="#2C3A61"
      />
    );
  }

  return (
    <div className="App">
      <ProductList products={products.data || []} />
    </div>
  );
};

export default Home;
