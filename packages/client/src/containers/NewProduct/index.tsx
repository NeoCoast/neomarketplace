import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import UserContext from 'context';
import trpc from 'utils/trpc';

import { ProductType } from 'types/product';

import './styles.scss';

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const mutation = trpc.product.createProduct.useMutation();

  const { selectedUser } = useContext(UserContext);

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/');
    } else if (mutation.isError) {
      setError('Error creating product.');
    }

    setIsLoading(false);
  }, [mutation]);

  return (
    <ProductForm
      error={error}
      isLoading={isLoading}
      handleSave={(product: ProductType) => {
        setIsLoading(true);
        mutation.mutate({ newProduct: product, ownerId: selectedUser.id || 1 });
      }}
    />
  );
};
export default NewProduct;
