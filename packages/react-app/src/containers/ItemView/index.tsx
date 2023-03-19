import React, {
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
import { format } from 'date-fns';

import { defaultAvatar } from 'data/mockedData';
import routes from 'constants/routes';
import trpc from 'utils/trpc';
import EditIcon from 'assets/EditIcon.svg';
import CartIcon from 'assets/CartIcon.svg';

import CustomButton from 'components/CustomButton';
import StatusTag from 'components/StatusTag';
import EmptyState from 'components/EmptyState';

import UserContext from 'context';

import './styles.scss';

const ItemView = () => {
  const { id: itemId } = useParams();
  const { selectedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const productData = trpc.product.byId.useQuery({ id: Number(itemId) });
  const mutation = trpc.product.buyProduct.useMutation();

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

  if (productData.error) {
    setError('Item not found');
  }

  if (mutation.isSuccess) {
    navigate('/my-purchased');
  } else if (mutation.isError) {
    setError(mutation.error?.message || 'Something went wrong');
  }

  const creationDate = format(new Date(item?.createdAt || ''), 'eee dd MMM yyyy');

  return (
    <div className="App">
      {error || !item ? (
        <EmptyState text={error || 'Item not found'} />
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
                    mutation.mutate({
                      productId: Number(itemId),
                      buyerId: selectedUser?.id ?? 0,
                    });
                  }
                }}
              />
            )}
          </div>
          <div className="item-box__content">
            <img src={`data:image/jpeg;base64,${item.image}`} alt="Item" />
            <div className="item-box__content-info">
              <div className="item-box__content-seller">
                <img src={defaultAvatar} alt="Seller Avatar" /> {/* ToDo: Add seller avatar */}
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
              {/* Comments area??? */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemView;
