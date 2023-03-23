import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from 'components/ProductForm';
import EmptyState from 'components/EmptyState';

import UserContext from 'context';
import { products } from 'data/mockedData';

import './styles.scss';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();

  const item = products.find((product) => product.id === Number(itemId));

  const { selectedUser } = useContext(UserContext);

  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [error, setError] = useState('');

  // the states, navigate and selectedUser are going to be used once the feature is implemented

  const isOwner = item?.owner?.id === selectedUser.id;

  if (!item || !isOwner) {
    return (
      <EmptyState text="Item not found" />
    );
  }

  return (
    <ProductForm
      handleSave={(newProductData) => window.alert('This feature is not implemented yet!')}
      product={item}
      error={error}
      isLoading={isLoadingEdit}
      isEdit
    />
  );
};
export default EditProduct;
