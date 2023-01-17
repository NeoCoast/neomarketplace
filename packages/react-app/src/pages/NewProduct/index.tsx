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
    <div>
      <ProductForm handleSuccess={handleSuccess} />
    </div>
  );
};
export default NewProduct;
