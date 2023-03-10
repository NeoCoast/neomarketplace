import React, { useState, useEffect, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import UserContext from 'context';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';

import { products } from 'data/mockedData';
import { ProductType } from '@server/types/product';

import './styles.scss';

const MyListing = () => {
  const { selectedUser } = useContext(UserContext);

  const [loadingItems, setLoadingItems] = useState(true);
  const [items, setItems] = useState<ProductType[]>([]);

  useEffect(() => {
    try {
      setItems(products.filter(({ owner }) => owner.id === selectedUser.id));
    } finally {
      setTimeout(() => {
        setLoadingItems(false);
      }, 2000); // ToDo.
    }
  }, [products, selectedUser]);

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

  return (
    <div className="my-listing">
      <div>
        <div className="my-listing__title-container">
          <img src={TitleImage} alt="My Listing" className="my-listing__title-img" />
          <span className="my-listing__title">My Listing</span>
        </div>

        <ProductList products={items} />
      </div>
    </div>
  );
};

export default MyListing;
