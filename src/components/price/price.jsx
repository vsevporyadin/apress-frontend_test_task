import React from 'react';
import styles from './price.scss';
import classNames from 'classnames';

const colors = ['gray', 'pink'];

const Price = ({ price, currency = 'руб.', className, color }) => {
  const colorClass = colors.includes(color) ? color : colors[0];
  return (
    <p className={classNames(styles.price, className, styles[colorClass])}>{price}&nbsp;{currency}</p>
  );
};

export default Price;
