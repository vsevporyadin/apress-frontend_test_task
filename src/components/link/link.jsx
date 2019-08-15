import React from 'react';
import classNames from 'classnames';
import styles from './link.scss';

const Link = ({ url, children, className }) => (
  <a className={classNames(styles.base, className)} href={url}>{children}</a>
);

export default Link;
