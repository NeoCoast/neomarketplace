import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductForm from 'components/ProductForm';

import { ProductType } from 'types/product';
import { products } from 'data/mockedData';

import './styles.scss';

const EditProduct = () => {
  const [product, setProduct] = useState<ProductType>();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => { // TO DO: real backend request
      setProduct(products[0]);
    }, 1000)
  }, [id]);

  if (!product) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading={!product}
        color="#2C3A61"
      />
    );
  }

  return (
    <ProductForm
      handleSuccess={handleSuccess}
      product={product}
      isEdit
    />
  );
};
export default EditProduct;
