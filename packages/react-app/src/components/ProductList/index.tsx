import React from 'react';

import ProductItem from '../ProductItem';

import './styles.scss';

interface Product {
  id: number,
  name: string,
  image: string,
  msgsCount: number,
  price: number,
  publicationDate: string,
  seller: string,
  sellerPic: string,
}

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
