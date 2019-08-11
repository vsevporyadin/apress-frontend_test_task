import React, { Fragment, Component } from 'react';
import ProductList from '../product-list/product-list';
import styles from './catalog.scss';
import classNames from 'classnames';
import PopupOverlay from '../popup/popup-overlay/popup-overlay';

export default class Catalog extends Component {
  state = {
    isPopupShown: false,
    popupType: null,
    selectedProductId: null,
  };

  hidePopup = () => {
    this.setState({ isPopupShown: false })
  };

  showPopup = (type, id) => {
    this.setState({ isPopupShown: true, popupType: type, selectedProductId: id })
  };

  render () {
    const { products } = this.props;
    const { isPopupShown, popupType, selectedProductId } = this.state;
    const selectedItem = Array.isArray(products) && products.filter(product => product.id === selectedProductId)[0];
    return (
      <Fragment>
        {isPopupShown && popupType &&
          <PopupOverlay hidePopup={this.hidePopup} popupType={popupType} selectedItem={selectedItem} />
        }
        <div className={classNames(styles.wrap)}>
          <ProductList products={products} showPopup={this.showPopup} hidePopup={this.hidePopup} />
        </div>
      </Fragment>
    )
  }
};
