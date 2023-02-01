import React from 'react';

import { Product } from 'types/product';
import ProductItem from '../ProductItem';

import './styles.scss';

type ProductListProps = {
  products?: Product[],
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
