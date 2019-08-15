import styles from './order-popup.scss';
import Button from '../../button/button';
import Price from '../../price/price';
import classNames from 'classnames';
import React from 'react';

const OrderPopup = ({ selectedItem, hidePopup, currency }) => {
  const { title, price, img } = selectedItem || {};
  return (
    <div className={styles.order}>
      <Button isClosing className={styles.close} onClick={hidePopup}/>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['img-and-price-wrap']}>
        <img className={styles.image} src={img} alt={title} title={title}/>
        <Price price={price} currency={currency} color='pink' />
      </div>
      <form>
        <p className={styles['field-label-wrap']}>
          <label className={styles['label']} htmlFor="comment">Комментарий к заказу:</label>
          <textarea className={classNames(styles.comment, styles.field)} name="comment" id="comment" />
        </p>
        <p className={styles['field-label-wrap']}>
          <label className={styles['label']} htmlFor="phone">Ваш телефон*:</label>
          <span>
          <input className={classNames(styles.phone, styles.field)} type="tel"/>
          <Button color='pink'>Отправить</Button>
        </span>
        </p>
      </form>
    </div>
  );
};

export default OrderPopup;
