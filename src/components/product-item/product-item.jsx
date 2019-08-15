import React from 'react';
import styles from './product-item.scss';
import Button from '../button/button';
import Price from '../price/price';
import Link from '../link/link';

const ProductItem = ({ title, price, img, currency = 'руб.', showPopup, id }) => (
  <div className={styles.wrap}>
    <div className={styles['image-wrap']}>
      <img src={img} alt={title} title={title} className={styles.image} />
    </div>
    <header className={styles.header}>
      <h2 className={styles.title}>
        <Link url="#">{title}</Link>
      </h2>
      <Price className={styles.price} price={price} currency={currency} />
    </header>
    <div className={styles['buttons-block']}>
      <Button color='pink' onClick={() => showPopup('order', id)}>Заказать</Button>
      <Button color='gray' onClick={() => showPopup('cart', id)}>В корзину</Button>
    </div>
  </div>
);

export default ProductItem;
