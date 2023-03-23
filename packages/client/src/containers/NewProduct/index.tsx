import React, {
  useState,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import UserContext from 'context';

import './styles.scss';

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // the states, navigate and selectedUser are going to be used once the feature is implemented

  const navigate = useNavigate();

  const { selectedUser } = useContext(UserContext);

  return (
    <ProductForm
      error={error}
      isLoading={isLoading}
      handleSave={(product) => window.alert('This feature is not implemented yet!')}
    />
  );
};
export default NewProduct;
