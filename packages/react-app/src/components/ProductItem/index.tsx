import React, { useEffect, useState } from 'react';
import { useNavigate, generatePath, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import MessagesIcon from 'assets/Msgs.svg';
import routes from 'constants/routes';

import { defaultAvatar } from 'data/mockedData';
import { ProductType } from 'types/product';

import './styles.scss';
import StatusTag from 'components/StatusTag';

const ProductItem = ({
  id: productId,
  name,
  image,
  msgsCount,
  price,
  createdAt,
  owner,
  buyer,
} : ProductType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sellerName, setSellerName] = useState<string>('');

  useEffect(() => {
    setSellerName(owner.name);
  }, []);

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
          <span className="product-item__date">{format(new Date(createdAt), 'MM/dd/yyyy')}</span>
        </div>
        <div className="product-item__divider" />
        <div className="product-item__seller-container">
          <div className="product-item__avatar-container">
            <img
              src={defaultAvatar}
              alt="User Avatar"
              className="product-item__avatar"
            />
            <span className="product-item__seller-name">{sellerName}</span>
          </div>
          <div className="product-item__divider" />
          <div className="product-item__msgs-container">
            <img
              src={MessagesIcon}
              alt="Messages inbox"
            />
            <span className="product-item__msgs-count">{msgsCount}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductItem;
