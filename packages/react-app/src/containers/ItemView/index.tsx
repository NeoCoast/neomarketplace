import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import { useParams } from 'react-router-dom';

import { UserType } from 'types/user';
import { Product } from 'types/product';

import CustomButton from 'components/CustomButton';
import StatusTag from 'components/StatusTag';

import EditIcon from 'assets/EditIcon.svg';
import CartIcon from 'assets/CartIcon.svg';

import UserContext from 'context';

import './styles.scss';

const ItemView = () => {
  const { id: itemId } = useParams();
  const { selectedUser, usersList } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [item, setItem] = useState<Product | null>(null);
  const [seller, setSeller] = useState<UserType | null>(null);

  const isSold = useMemo(() => item?.buyer, [item?.buyer]);
  const isOwner = useMemo(() => item?.seller === selectedUser.id, [item?.seller, selectedUser.id]);

  useEffect(() => {
    setTimeout(() => {
      try {
        setItem({ // TO DO: real backend request
          id: 1,
          name: '92 ALLIUM PLACE, ORLANDO FL 32827',
          description: 'Vestibulum ante ipsum primis in faucibus orci \nluctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... . Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... . Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... . Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... . Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... . Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... . Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsu',
          price: 100,
          image: 'https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles-978x652.jpg',
          seller: 2,
          publicationDate: '2021-01-01',
        });
      } catch {
        setError('Something went wrong getting item data');
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  }, [itemId]);

  useEffect(() => {
    setSeller(usersList.find(({ id }) => id === item?.seller) || null);
  }, [item?.seller, usersList]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="item-box">
          <div className="item-box__title">
            <p className="item-box__title__text">{item?.name}</p>
            {isSold && !isOwner ? (
              <StatusTag text="Sold" />
            ) : (
              <CustomButton
                text={isOwner ? 'Edit' : 'Purchase Item'}
                icon={isOwner ? EditIcon : CartIcon}
                isPrimary={!isOwner}
                onClick={() => {}}
              />
            )}
          </div>
          <div className="item-box__content">
            <img src={item?.image} alt="Item" />
            <div className="item-box__content__info">
              <div className="item-box__content__seller">
                <img src={seller?.picture} alt="Seller Avatar" />
                <p className="item-box__content__seller__name">{seller?.name}</p>
              </div>
              <div className="item-box__content__main">
                <p className="item-box__content__title">{item?.name}</p>
                <div className="item-box__content__description">
                  {item?.description}
                </div>
              </div>
              <div className="item-box__content__details">
                <p className="item-box__content__details__price">{item?.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
                </p>
                <div className="item-box__content__details__date">
                  <p className="item-box__content__details__date__title">published</p>
                  <p className="item-box__content__details__date__info">{item?.publicationDate}</p>
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
