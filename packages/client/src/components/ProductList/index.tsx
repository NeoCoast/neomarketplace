import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductType } from 'types/product';
import routes from 'constants/routes';

import CustomButton from 'components/CustomButton';
import ProductItem from 'components/ProductItem';
import EmptyState from 'components/EmptyState';

import './styles.scss';

type ProductListProps = {
  products: ProductType[] | undefined;
}

const ProductList = ({ products = [] } : ProductListProps) => {
  const navigate = useNavigate();

  return (
    <div className="products">
      <div className="products__button-row">
        <CustomButton
          text="Publish New Product"
          onClick={() => navigate(routes.newProduct)}
        />
      </div>

      {products.length === 0 ? (
        <EmptyState text="No products found" />
      ) : (
        <div className="products__list">
          {products.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
