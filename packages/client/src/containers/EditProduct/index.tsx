import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductForm from 'components/ProductForm';
import EmptyState from 'components/EmptyState';

import trpc from 'utils/trpc';
import UserContext from 'context';

import './styles.scss';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();

  const { selectedUser } = useContext(UserContext);

  const getProduct = trpc.product.byId.useQuery({ id: Number(itemId) });
  const editProduct = trpc.product.editProduct.useMutation();

  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [error, setError] = useState('');

  const isOwner = getProduct.data?.owner.id === selectedUser.id;

  if (editProduct.isSuccess) {
    navigate('/');
  }

  if (editProduct.isError) {
    setError('Error editing product.');

    setIsLoadingEdit(false);
  }

  if (getProduct.isLoading) {
    return (
      <ClipLoader
        className="App__loader"
        size={70}
        loading
        color="#2C3A61"
      />
    );
  }

  if (getProduct.isError || !isOwner) {
    return (
      <EmptyState text="Item not found" />
    );
  }

  return (
    <ProductForm
      handleSave={(newProductData) => {
        setIsLoadingEdit(true);
        editProduct.mutate({ newProductData, productId: Number(getProduct.data.id) });
      }}
      product={getProduct.data}
      error={error}
      isLoading={isLoadingEdit}
      isEdit
    />
  );
};
export default EditProduct;
