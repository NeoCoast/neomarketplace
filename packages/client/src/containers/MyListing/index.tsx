import React, { useContext } from 'react';

import UserContext from 'context';

import TitleImage from 'assets/title-banner.png';
import ProductList from 'components/ProductList';

import { products } from 'data/mockedData';

import './styles.scss';

const MyListing = () => {
  const { selectedUser } = useContext(UserContext);

  const productsList = products.filter((product) => product.owner?.id === selectedUser?.id);

  return (
    <div className="my-listing">
      <div>
        <div className="my-listing__title-container">
          <img
            src={TitleImage}
            alt="My Listing"
            className="my-listing__title-img"
          />
          <span className="my-listing__title">
            My Listing
          </span>
        </div>

        <ProductList products={productsList || []} />
      </div>
    </div>
  );
};

export default MyListing;
