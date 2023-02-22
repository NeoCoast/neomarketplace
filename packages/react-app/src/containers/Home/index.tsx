import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductList from 'components/ProductList';

import { products } from 'data/mockedData';

import { ProductType } from 'types/product';

import './styles.scss';

const Home = () => {
  const [loadingItems, setLoadingItems] = useState(false);
  const [items, setItems] = useState<ProductType[]>([]);

  useEffect(() => {
    try {
      setLoadingItems(true);
      setItems(products);
    } finally {
      setTimeout(() => {
        setLoadingItems(false);
      }, 2000); // ToDo.
    }
  }, []);

  if (loadingItems) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading={loadingItems}
        color="#2C3A61"
      />
    );
  }

  if (!items.length) { // ToDo: Add empty state.
    return (
      <div>
        No products available.
      </div>
    );
  }

  return (
    <div className="App">
      <ProductList products={items} />
    </div>
  );
};

export default Home;
