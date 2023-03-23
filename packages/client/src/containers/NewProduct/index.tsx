import React, {
  useState,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import UserContext from 'context';
import trpc from 'utils/trpc';

import './styles.scss';

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const createProduct = trpc.product.createProduct.useMutation();

  const { selectedUser } = useContext(UserContext);

  if (createProduct.isSuccess) {
    navigate('/');
  }

  if (createProduct.isError && !error) {
    setError('Error creating product.');

    setIsLoading(false);
  }

  return (
    <ProductForm
      error={error}
      isLoading={isLoading}
      handleSave={(product) => {
        setIsLoading(true);
        createProduct.mutate({ newProduct: product, ownerId: selectedUser.id || 1 });
      }}
    />
  );
};
export default NewProduct;
