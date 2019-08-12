import React from 'react';
import styles from './cart-popup.scss';
import Button from '../../button/button';
import Price from '../../price/price';
import classNames from 'classnames';

const CartPopup = ({ selectedItem, currency, hidePopup }) => {
  const { title, price, img } = selectedItem || {};
  return (
    <div className={styles.cart}>
      <p className={styles.header}>Вы добавили в корзину:</p>
      <div className={styles.wrap}>
        <div className={styles['product-wrap']}>
          <img className={styles.image} src={img} alt={title} title={title} />
          <div className={styles['title-and-price-wrap']}>
            <h2 className={styles.title}>{title}</h2>
            <Price price={price} currency={currency} color='gray' />
            <Button isClosing color="pink" className={styles.close} onClick={hidePopup} />
          </div>
        </div>
        <Button className={styles['to-cart']} color="pink">Перейти в корзину</Button>
      </div>
    </div>
  );
};

export default CartPopup;
