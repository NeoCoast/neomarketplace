import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductList from 'components/ProductList';

import products from 'data/mockedData';

import './styles.scss';

type Product = {
  id: number,
  name: string,
  image: string,
  msgsCount: number,
  price: number,
  publicationDate: string,
  seller: string,
  sellerPic: string,
}

const Home = () => {
  const [loadingItems, setLoadingItems] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

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
