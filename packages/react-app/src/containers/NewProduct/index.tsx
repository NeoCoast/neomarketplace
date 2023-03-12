import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import trpc from 'utils/trpc';

import './styles.scss';
import { ProductType } from 'types/product';

const NewProduct = () => {
  const navigate = useNavigate();
  const mutation = trpc.product.createProduct.useMutation();

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/');
    }
  }, [mutation]);

  return (
    <ProductForm handleSave={(product) => mutation.mutate(product as ProductType)} />
  );
};
export default NewProduct;
