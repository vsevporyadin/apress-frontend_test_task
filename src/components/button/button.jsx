import React from 'react';
import classNames from 'classnames';
import styles from './button.scss';

const colors = ['pink', 'gray'];

const Button = ({ onClick, color, children, isClosing, className }) => {
  const clr = colors.includes(color) && color;
  const closeClass = isClosing && styles.close;
  return (
    <button className={classNames(styles[clr], styles.base, closeClass, className)} type='button' onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;
