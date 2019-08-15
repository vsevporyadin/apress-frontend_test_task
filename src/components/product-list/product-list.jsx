import React from 'react';
import styles from './product-list.scss';
import ProductItem from '../product-item/product-item';

const ProductList = ({ products, showPopup, hidePopup }) => (
  <ul className={styles.wrap}>
    {products && products.map(child => (
      <li key={child.id}>
        <ProductItem {...child} showPopup={showPopup} hidePopup={hidePopup} />
      </li>
    ))}
  </ul>
);
export default ProductList;
