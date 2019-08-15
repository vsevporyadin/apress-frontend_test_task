import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  success: ['products'],
  failure: ['error'],
}, { prefix: 'product.js/'});
