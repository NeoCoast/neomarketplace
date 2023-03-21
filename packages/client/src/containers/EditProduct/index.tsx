import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import ProductForm from 'components/ProductForm';
import EmptyState from 'components/EmptyState';

import { ProductType } from 'types/product';

import trpc from 'utils/trpc';

import './styles.scss';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams();

  const getProduct = trpc.product.byId.useQuery({ id: Number(itemId) });
  const editProduct = trpc.product.editProduct.useMutation();

  const [product, setProduct] = useState<ProductType | null>();
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingEdit, setIsLoadingEdit] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editProduct.isSuccess) {
      navigate('/');
    } else if (editProduct.isError) {
      setError('Error editing product.');
    }

    setIsLoadingEdit(editProduct.isLoading);
  }, [editProduct.isSuccess, editProduct.isError]);

  useEffect(() => {
    if (getProduct.data) {
      setProduct(getProduct.data);

      setIsLoadingProduct(false);
    }
  }, [getProduct.data]);

  if (isLoadingProduct) {
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
      <EmptyState text="Item not found" />
    );
  }

  return (
    <ProductForm
      handleSave={(newProductData: ProductType & { image: string }) => {
        setIsLoadingEdit(true);
        editProduct.mutate({ newProductData, productId: Number(product.id) });
      }}
      product={product}
      error={error}
      isLoading={isLoadingEdit}
      isEdit
    />
  );
};
export default EditProduct;
