import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import trpc from 'utils/trpc';
import { ProductType } from 'types/product';

import './styles.scss';

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const mutation = trpc.product.createProduct.useMutation();

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
        mutation.mutate(product as ProductType & { image: string });
      }}
    />
  );
};
export default NewProduct;
