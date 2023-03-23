import React, {
  useMemo,
  useContext,
} from 'react';
import {
  useParams,
  generatePath,
  useNavigate,
} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { format } from 'date-fns';

import routes from 'constants/routes';
import trpc from 'utils/trpc';
import UserContext from 'context';

import EditIcon from 'assets/EditIcon.svg';
import CartIcon from 'assets/CartIcon.svg';

import CustomButton from 'components/CustomButton';
import StatusTag from 'components/StatusTag';
import EmptyState from 'components/EmptyState';

import './styles.scss';

const ItemView = () => {
  const { id: itemId } = useParams();
  const navigate = useNavigate();

  const { selectedUser } = useContext(UserContext);

  const productData = trpc.product.byId.useQuery({ id: Number(itemId) });

  const item = productData.data;

  const isSold = useMemo(() => (typeof item?.buyer?.id === 'number'), [item?.buyer?.id]);
  const isOwner = useMemo(() => item?.owner.id === selectedUser.id, [item?.owner, selectedUser.id]);

  if (productData.isLoading) {
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

  const creationDate = item ? format(new Date(item.createdAt), 'eee dd MMM yyyy') : '';

  return (
    <div className="App">
      {!item ? (
        <EmptyState text="Item not found" />
      ) : (
        <div className="item-box">
          <div className="item-box__title">
            <p className="item-box__title-text">{item?.name}</p>
            {isSold ? (
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
                  } else {
                    window.alert('This feature is not implemented yet!');
                  }
                }}
              />
            )}
          </div>
          <div className="item-box__content">
            <img src={`data:image/jpeg;base64,${item.image}`} alt="Item" />
            <div className="item-box__content-info">
              <div className="item-box__content-seller">
                <img
                  src={`data:image/jpeg;base64,${item.owner.avatar}`}
                  alt="Seller Avatar"
                />
                <p className="item-box__content-seller-name">{item.owner.name}</p>
              </div>
              <div className="item-box__content-main">
                <p className="item-box__content-title">{item.name}</p>
                <div className="item-box__content-description">
                  {item.description}
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
                  <p className="item-box__content-details-date-info">{creationDate.toString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemView;
