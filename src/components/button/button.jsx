import React from 'react';
import classNames from 'classnames';
import styles from './button.scss';

const colors = ['pink', 'gray'];

const returnCloseClasses = (color, className) => (
  classNames(styles.base, styles.close, color === 'pink' ? styles['close-pink'] : styles['close-gray'], className)
);

const returnOrdinaryClasses = (color, className) => (
  classNames(styles.base, styles[color], color === 'pink' ? styles.pink : styles.gray, className)
);

const Button = ({ onClick, color, children, isClosing, className }) => {
  const clr = colors.includes(color) && color;
  const buttonClasses = isClosing ? returnCloseClasses(clr, className) : returnOrdinaryClasses(clr, className);
  return (
    <button className={buttonClasses} type='button' onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;
