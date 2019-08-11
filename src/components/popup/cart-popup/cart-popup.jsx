import React from 'react';
import styles from './cart-popup.scss';
import Button from '../../button/button';
import Price from '../../price/price';
import classNames from 'classnames';

const CartPopup = ({ productProps, onClose, type, currency }) => {
  return (
    <div className={styles.cart}>
      {title}{price}{image}
    </div>
  );
};

export default CartPopup;
