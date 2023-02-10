import React, { useEffect, useState } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { format } from 'date-fns';

import MessagesIcon from 'assets/Msgs.svg';
import routes from 'constants/routes';

import { users } from 'data/mockedData';
import { ProductType } from 'types/product';

import './styles.scss';

const ProductItem = ({
  id: productId,
  name,
  image,
  msgsCount,
  price,
  publicationDate,
  seller,
} : ProductType) => {
  const navigate = useNavigate();

  const [sellerName, setSellerName] = useState<string>('');
  const [sellerImage, setSellerImage] = useState<string>('');

  useEffect(() => {
    setSellerName(users.find(({ id }) => id === seller)?.name || '');
    setSellerImage(users.find(({ id }) => id === seller)?.picture || '');
  }, []);

  return (
    <button
      className="product-item__card"
      onClick={() => {
        const itemPath = generatePath(routes.item, { id: productId });
        navigate(itemPath);
      }}
    >
      <img
        className="product-item__img"
        alt="product img"
        src={`data:image/jpeg;base64,${image}`}
      />
      <div className="product-item__body">
        <span className="product-item__name">{name}</span>
        <div className="product-item__price-container">
          <span className="product-item__price">
            $ {price}
          </span>
          <span className="product-item__date">{format(new Date(publicationDate), 'MM/dd/yyyy')}</span>
        </div>
        <div className="product-item__divider" />
        <div className="product-item__seller-container">
          <div className="product-item__avatar-container">
            <img
              src={`data:image/jpeg;base64,${sellerImage}`}
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
