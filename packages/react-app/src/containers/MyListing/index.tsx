import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import TitleImage from 'assets/title-banner.png';
import ProductList from '../../components/ProductList';

import products from '../../data/mockedData';

import './styles.scss';

type Product = {
  id: number,
  name: string,
  image: string,
  msgsCount: number,
  price: number,
  publicationDate: string,
  seller: string,
  sold: boolean,
}

const MyListing = () => {
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
    <div className="my-listing">
      <div>
        <div className="my-listing__title-container">
          <img src={TitleImage} alt="My Listing" className="my-listing__title-img" />
          <span className="my-listing__title">My Listing</span>
        </div>

        {
          items.length === 0 ? (
            <div>
              No products added on my listing yet.
            </div>
          ) : (
            <ProductList products={items} />
          )
        }
      </div>
    </div>
  );
};

export default MyListing;
