import { Types } from '../actions/product';
import { createReducer } from 'reduxsauce';

const getInitialState = () => ({
  products: null,
  error: null,
});

const setProducts = (state, { products }) => ({
  ...state,
  products,
});

const setError = (state, { error }) => ({
  ...state,
  error
});

const reducer = createReducer(getInitialState(), {
  [Types.SUCCESS]: setProducts,
  [Types.FAILURE]: setError,
});
export default reducer;


