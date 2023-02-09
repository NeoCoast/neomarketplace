import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import './styles.scss';

const NewProduct = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <ProductForm handleSuccess={handleSuccess} />
  );
};
export default NewProduct;
