import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductForm from 'components/ProductForm';
import EmptyState from 'components/EmptyState';

import { ProductType } from 'types/product';
import { products } from 'data/mockedData';

import './styles.scss';

const EditProduct = () => {
  const [product, setProduct] = useState<ProductType | null>();
  const [isLoading, setIsLoading] = useState(true);

  const { id: itemId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => { // TO DO: real backend request and add error handling
      setProduct(products.find(({ id }) => id === Number(itemId)) || null);
      setIsLoading(false);
    }, 1000)
  }, [itemId]);

  if (isLoading) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading={!product}
        color="#2C3A61"
      />
    );
  }

  if (!product) {
    return (
      <EmptyState text='Item not found'/>
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
