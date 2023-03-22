import React from 'react';
import { useNavigate, generatePath, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import MessagesIcon from 'assets/Msgs.svg';
import routes from 'constants/routes';
import StatusTag from 'components/StatusTag';

import { ProductType } from 'types/product';

import './styles.scss';

const ProductItem = ({
  id: productId,
  name,
  image,
  price,
  createdAt,
  owner,
  buyer,
} : ProductType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <button
      className="product-item__card"
      onClick={() => {
        const itemPath = generatePath(routes.item, { id: productId });
        navigate(itemPath);
      }}
    >
      {(typeof buyer === 'number') && (
        <StatusTag
          text="Sold"
          isListing
          isGreen={pathname === routes.myListing}
        />
      )}
      <img
        className="product-item__img"
        alt="product img"
        src={`data:image/jpeg;base64,${image}`}
      />
      <span className="product-item__name">{name}</span>
      <div className="product-item__body">
        <div className="product-item__price-container">
          <span className="product-item__price">
            $ {price}
          </span>
          <span className="product-item__date">{format(new Date(createdAt || ''), 'dd/MM/yyyy')}</span>
        </div>
        <div className="product-item__divider" />
        <div className="product-item__seller-container">
          <div className="product-item__avatar-container">
            <img
              src={`data:image/jpeg;base64,${owner?.avatar}`}
              alt="User Avatar"
              className="product-item__avatar"
            />
            <span className="product-item__seller-name">{owner?.name || ''}</span>
          </div>
          <div className="product-item__divider" />
          <div className="product-item__msgs-container">
            <img
              src={MessagesIcon}
              alt="Messages inbox"
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductItem;
