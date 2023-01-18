import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import { useParams } from 'react-router-dom';

import { UserType } from 'types/user';
import { Product } from 'types/product';

import UserContext from 'context';

import './styles.scss';

const ItemView = () => {
  const { id } = useParams();
  const { selectedUser, usersList } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [item, setItem] = useState<Product | null>(null);
  const [buyer, setBuyer] = useState<UserType | null>(null);
  const [seller, setSeller] = useState<UserType | null>(null);

  const isSold = useMemo(() => item?.buyer, [item?.buyer]);
  const isOwner = useMemo(() => item?.seller === selectedUser.id, [item?.seller, selectedUser.id]);

  useEffect(() => {
    setTimeout(() => {
      try {
        setItem({ // TO DO: real backend request
          id: 1,
          name: '92 ALLIUM PLACE, ORLANDO FL 32827',
          description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit... .',
          price: 100,
          image: 'https://i.pravatar.cc/150?img=1',
          seller: 2,
          publicationDate: '2021-01-01',
          buyer: 1,
        });

        setSeller(usersList.find((user) => user.id === item?.seller) || null);
      } catch {
        setError('Something went wrong getting item data');
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  }, [id]);

  useEffect(() => {
    if (isSold) {
      setBuyer(usersList.find((user) => user.id === item?.buyer) || null);
    }
  }, [isSold]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Item View</h1>
          <h1>
            {buyer?.name}
          </h1>
          {
            isOwner && (
              <h1>{seller?.name}</h1>
            )
          }
        </div>
      )}
    </div>
  );
};

export default ItemView;
