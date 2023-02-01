import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from 'components/ProductForm';

import './styles.scss';

type ProductType = {
  name: string,
  description: string,
  price: number,
  image?: File,
}

const EditProduct = () => {
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/');
  };

  useEffect(() => {
    console.log('id');
    const prod = {
      name: 'Fini 300g',
      description: 'Las mejores fini del estado',
      price: 80,
    };
    setProduct(prod);
  }, [id]);

  if (!product) {
    return <p>Loading</p>;
  }

  return (
    <ProductForm
      handleSuccess={handleSuccess}
      isEdit
      product={product}
    />
  );
};
export default EditProduct;
