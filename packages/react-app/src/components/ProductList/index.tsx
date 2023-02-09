import React from 'react';

import { ProductType } from 'types/product';
import ProductItem from '../ProductItem';

import './styles.scss';

type ProductListProps = {
  products?: ProductType[],
}

const ProductList = ({ products = [] } : ProductListProps) => (
  <div className="product-list">
    {
      products.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))
    }
  </div>
);

export default ProductList;
