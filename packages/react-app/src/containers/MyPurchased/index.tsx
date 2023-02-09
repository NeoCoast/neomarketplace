import React, { useState, useEffect, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import UserContext from 'context';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';

import { products } from 'data/mockedData';
import { ProductType } from 'types/product';

import './styles.scss';

const MyPurchased = () => {
  const { selectedUser } = useContext(UserContext);

  const [loadingItems, setLoadingItems] = useState(false);
  const [items, setItems] = useState<ProductType[]>([]);

  useEffect(() => {
    try {
      setLoadingItems(true);
      setItems(products.filter(({ buyer }) => buyer === selectedUser.id));
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
