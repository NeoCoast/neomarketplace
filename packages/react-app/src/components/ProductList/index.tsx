import React from 'react';

import ProductItem from '../ProductItem';

import './styles.scss';

interface Product {
  name: string,
  image: string,
  msgsCount: number,
  price: number,
  publicationDate: Date | string | number,
  seller: string,
}

type ProductListProps = {
  products?: Product[],
}

const ProductList = ({ products = [] } : ProductListProps) => (
  <div className="product-list">
    {
      products.map((product) => (
        <ProductItem {...product} />
      ))
    }
  </div>
);

export default ProductList;
