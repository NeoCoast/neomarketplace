import React, { useContext } from 'react';

import UserContext from 'context';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';

import { products } from 'data/mockedData';

import './styles.scss';

const MyPurchased = () => {
  const { selectedUser } = useContext(UserContext);

  const productsList = products.filter((product) => product.buyer?.id === selectedUser?.id);

  return (
    <div className="my-purchased">
      <div>
        <div className="my-purchased__title-container">
          <img
            src={TitleImage}
            alt="My Purchased"
            className="my-purchased__title-img"
          />
          <span className="my-purchased__title">
            My Purchased
          </span>
        </div>

        <ProductList products={productsList || []} />
      </div>
    </div>
  );
};

export default MyPurchased;
