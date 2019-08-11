import React, { Component } from 'react';
import Catalog from './catalog/catalog';
import { connect } from 'react-redux';
import { Creators } from '../common/actions/product';

class App extends Component {
  componentDidMount () {
    this.props.getProducts();
  }

  render() {
    return (
      <Catalog {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(Creators.success(API.products))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
