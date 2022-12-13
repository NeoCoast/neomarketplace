import React from 'react';

import ProductList from '../../components/ProductList';

import products from '../../data/mockedData';

import './styles.scss';

const Home = () => (
  <div className="App">
    <ProductList products={products} />
  </div>
);

export default Home;
