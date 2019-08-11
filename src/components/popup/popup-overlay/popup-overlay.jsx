import React, { Component } from 'react';
import styles from './popup-overlay.scss';
import CartPopup from '../cart-popup/cart-popup';
import OrderPopup from '../order-popup/order-popup';

class PopupOverlay extends Component {

  overlayRef = React.createRef();

  componentDidMount() {
    this.overlayRef.current && this.overlayRef.current.addEventListener('click', event =>
      event.target === event.currentTarget && this.props.hidePopup()
    );
  }

  componentWillUnmount() {
    this.overlayRef.current && this.overlayRef.current.removeEventListener('click', this.props.hidePopup)
  }

  render() {
    const { popupType, ...restProps } = this.props;
    console.log(restProps)
    return (
      <div className={styles.overlay} onClick={this.hidePopup} ref={this.overlayRef}>
        {popupType === 'order'
          ? <OrderPopup {...restProps} />
          : <CartPopup {...restProps} />
        }
      </div>
    )
  }
}

export default PopupOverlay;
