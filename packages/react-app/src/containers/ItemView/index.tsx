import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import {
  useParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { UserType } from '@server/types/user';
import { ProductType } from '@server/types/product';

import { products } from 'data/mockedData';

import CustomButton from 'components/CustomButton';
import StatusTag from 'components/StatusTag';
import EmptyState from 'components/EmptyState';

import EditIcon from 'assets/EditIcon.svg';
import CartIcon from 'assets/CartIcon.svg';

import UserContext from 'context';

import './styles.scss';
import routes from 'constants/routes';

const ItemView = () => {
  const { id: itemId } = useParams();
  const { selectedUser, usersList } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [item, setItem] = useState<ProductType | null>(null);
  const [owner, setOwner] = useState<UserType | null>(null);

  const isSold = useMemo(() => (typeof item?.buyer === 'number'), [item?.buyer]);
  const isOwner = useMemo(() => item?.owner.id === selectedUser.id, [item?.owner, selectedUser.id]);

  useEffect(() => {
    setTimeout(() => {
      try {
        setItem(products.find(({ id }) => id === Number(itemId)) || null);
      } catch {
        setError('Something went wrong getting item data');
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  }, [itemId]);

  useEffect(() => {
    setOwner(usersList.find(({ id }) => id === item?.owner.id) || null);
  }, [item?.owner, usersList]);

  if (isLoading) {
    return (
      <div>
        <ClipLoader
          className="App__loader"
          size={70}
          loading
          color="#2C3A61"
        />
      </div>
    );
  }

  return (
    <div className="App">
      {error || !item ? (
        <EmptyState text={error || 'Item not found'} />
      ) : (
        <div className="item-box">
          <div className="item-box__title">
            <p className="item-box__title-text">{item?.name}</p>
            {isSold && !isOwner ? (
              <StatusTag text="Sold" />
            ) : (
              <CustomButton
                text={isOwner ? 'Edit' : 'Purchase Item'}
                icon={isOwner ? EditIcon : CartIcon}
                isPrimary={!isOwner}
                onClick={() => {
                  const itemPath = generatePath(routes.editProduct, { id: itemId });

                  if (isOwner) {
                    navigate(itemPath);
                  } else { // ToDo: Add purchase logic
                    console.log('Purchase Item');
                  }
                }}
              />
            )}
          </div>
          <div className="item-box__content">
            <img src={`data:image/jpeg;base64,${item?.image}`} alt="Item" />
            <div className="item-box__content-info">
              <div className="item-box__content-seller">
                <img src={`data:image/jpeg;base64,${owner?.image}`} alt="Seller Avatar" />
                <p className="item-box__content-seller-name">{owner?.name}</p>
              </div>
              <div className="item-box__content-main">
                <p className="item-box__content-title">{item?.name}</p>
                <div className="item-box__content-description">
                  {item?.description}
                </div>
              </div>
              <div className="item-box__content-details">
                <p className="item-box__content-details-price">
                  {item?.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
                <div className="item-box__content-details-date">
                  <p className="item-box__content-details-date-title">published</p>
                  <p className="item-box__content-details-date-info">{item?.createdAt}</p>
                </div>
              </div>
              {/* Comments area??? */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemView;
