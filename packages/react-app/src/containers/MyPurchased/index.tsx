import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';

import { products } from 'data/mockedData';
import { Product } from 'types/product';

import './styles.scss';

const MyPurchased = () => {
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

  return (
    <div className="my-purchased">
      <div>
        <div className="my-purchased__title-container">
          <img src={TitleImage} alt="My Purchased" className="my-purchased__title-img" />
          <span className="my-purchased__title">My Purchased</span>
        </div>

        {
          (!items.length) ? (
            <div>
              No products purchased yet.
            </div>
          ) : (
            <ProductList products={items} />
          )
        }
      </div>
    </div>
  );
};

export default MyPurchased;
