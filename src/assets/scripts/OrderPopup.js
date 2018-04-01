'use strict';

(function () {
  window.OrderPopup = OrderPopup

  /**
   * Order popup class
   * 
   * Public methods:
   * getElement(): Element
   * show(data: {id: nimber, title: string, price: number, img: string})
   * hide()
   *
   * @constructor
   */

  function OrderPopup () {
    // Constructor {
    let _orderPopupTemplate = 
      '<form class="order-popup__form">' +
        '<div class="order-popup__close-btn">X</div>' +
        '<h3 class="order-popup__title"></h3>' +
        '<div class="order-popup__content">' +
          '<div class="order-popup__left-side">' +
            '<div class="order-popup__img">' +
              '<img alt="product picture">' +
            '</div>' +
            '<p class="order-popup__price"></p>' +
          '</div>' +
          '<div class="order-popup__right-side">' +
            '<label>' +
              '<p>Комментарий к заказу:</p>' +
              '<textarea name="order-coments"></textarea>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<div class="order-popup__bottom">' +
          '<label>' +
            'Ваш телефон*:' +
            '<input class="order-popup__phone-field" type="tel" required pattern="\\+{0,}[0-9\\-\\(\\)\\s]{5,}" placeholder="+7__________">' +
          '</label>' +
            '<br>' +
            '<input class="order-popup__send-btn" type="submit" value="Отправить">' +
        '</div>' +
      '</form>' +
      '<div class="order-popup__mask"></div>'

    let _self = this
    let _mask
    let _data

    let _element = document.createElement('div')
    _element.className = 'order-popup'

    _element.addEventListener('click', function (e) {
      let target = e.target
      if (target.closest('.order-popup__close-btn') || target.closest('.order-popup__mask')) {
        _self.hide()
      }
    })

    _element.addEventListener('submit', submitBtnListener)
    // } Constructor

    this.getElement = function (data) {
      return _element
    }

    this.show = function (data) {
      if (!data) {
        console.error('You need to pass data object')
        return
      }
      _data = data
      _render()
    }

    this.hide = function () {
      _element.classList.remove('order-popup_active')
      _mask.classList.remove('order-popup__mask_active')
      _element.querySelector('form').reset()
    }

    function _render () {
      _element.innerHTML = _orderPopupTemplate

      _element.querySelector('.order-popup__title').innerHTML = _data.title
      _element.querySelector('.order-popup__price').innerHTML = formatePrice(_data.price)
      _element.querySelector('.order-popup__img img').src = _data.img
      _mask = _element.querySelector('.order-popup__mask')

      _mask.classList.add('order-popup__mask_active')
      _element.classList.add('order-popup_active')
      _element.querySelector('textarea').focus()
    }

    function submitBtnListener (e) {
      e.preventDefault()
      alert(
        'Sending data: ' + _data.id + ', ' + _data.title + ', ' + _data.price + '\n' +
        _element.querySelector('textarea').value + ', ' + _element.querySelector('.order-popup__phone-field').value
      )
      _self.hide()
    }

    function formatePrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
    }
  }
}())
