'use strict';

(function () {
  window.CartPopup = CartPopup

  /**
   * Cart poput class
   * 
   * Public methods:
   * getElement(): Element
   * active() - displaying cart element for *visibleTime* seconds
   * addItem({id: nimber, title: string, price: number, img: string}) - adding new product (active() will be called)
   *
   * @constructor
   * @param {number} visibleTime
   */

  function CartPopup (visibleTime) {
    // Constructor {
    let _cartPopupTemplate = 
      '<div class="cart-popup__arrow"> </div>' +
      '<div class="cart-popup__wrapper">' +
        '<h3 class="cart-popup__header">' +
          'Вы добавили в корзину:' +
        '</h3>' +
        '<ul class="cart-popup__list">' +
          '<li class="cart-popup__empty-item">Корзина пуста' +
        '</ul>' +
        '<button class="cart-popup__to-cart-btn">Перейти в корзину</button>' +
      '</div>'

    let _cartPopupItemTemplate =
      '<div class="cart-popup__img">' +
        '<img alt="product picture">' +
      '</div>' +
      '<div class="cart-popup__content">' +
        '<p class="cart-popup__title"></p>' +
        '<p class="cart-popup__price"></p>' +
      '</div>' +
      '<div class="cart-popup__close-btn">X</div>'

    let _visibleTime = visibleTime || 2500
    let _hideTimeout
    let _dataArray = []
    let _list

    let _element = document.createElement('div')
    _element.className = 'cart-popup'

    _element.addEventListener('mouseover', function (e) {
      clearTimeout(_hideTimeout)
    })

    _element.addEventListener('mouseout', function (e) {
      hide()
    })

    _element.addEventListener('click', function (e) {
      toCartBtnListener(e)
      removeItemBtnListener(e)
    })
    // } Constructor

    this.getElement = function () {
      render()
      return _element
    }

    this.active = function active () {
      _element.classList.add('cart-popup_active')
      hide()
    }

    this.addItem = function (itemData) {
      _dataArray.push(itemData)

      _element.querySelector('.cart-popup__empty-item').classList.remove('cart-popup__empty-item_active')
      let item = document.createElement('li')
      item.className = 'cart-popup__item'
      item.innerHTML = _cartPopupItemTemplate

      item.querySelector('.cart-popup__img img').src = itemData.img
      item.querySelector('.cart-popup__title').innerHTML = itemData.title
      item.querySelector('.cart-popup__price').innerHTML = formatePrice(itemData.price)
      item.dataset.id = itemData.id
      
      item.classList.add('cart-popup__item_active')
      // откладываем вызов classList.remove, что бы предыдущий (classList.add) не был проигнорирован
      setTimeout(function() { item.classList.remove('cart-popup__item_active') }, 0)
      
      _list.insertBefore(item, _list.firstChild)
      _list.scrollTop = 0
      this.active()
    }

    function hide () {
      clearTimeout(_hideTimeout)
      // если за время _visibleTime, ни что не сбросит таймер, начнем скрывать элемент
      // сброисть тамер может наведение курсора на элемент или добавление ещё одного товара
      _hideTimeout = setTimeout(function () {
        _element.classList.remove('cart-popup_active')
      }, _visibleTime)
    }

    function clean () {
      _dataArray = [];
      [].forEach.call(
        _element.querySelectorAll('.cart-popup__item'),
        function (item) { item.parentElement.removeChild(item) }
      )
      _element.querySelector('.cart-popup__empty-item').classList.add('cart-popup__empty-item_active')
    }

    function render () {
      _element.innerHTML = _cartPopupTemplate
      _list = _element.querySelector('.cart-popup__list')
    }

    function toCartBtnListener (e) {
      let target = e.target

      // "To card" button listening
      if (target.classList.contains('cart-popup__to-cart-btn')) {
        let sendingStr = '\n'

        for (let i = 0; i < _dataArray.length; i++) {
          sendingStr += _dataArray[i].id + ', ' + _dataArray[i].title + ', ' + _dataArray[i].price + '\n'
        }

        alert('Sending data: ' + sendingStr + '\n' + 'Cart will be cleared')
        clean()
      }
    }

    function removeItemBtnListener (e) {
      let target = e.target
      if (target.classList.contains('cart-popup__close-btn')) {
        let currentItem = target.closest('.cart-popup__item')
        let currentId = currentItem.dataset.id

        for (let i = 0; i < _dataArray.length; i++) {
          if (_dataArray[i].id == currentId) {
            _dataArray.splice(i, 1)
            break
          }
        }

        currentItem.parentElement.removeChild(currentItem)

        if (_list.children.length == 1) {
          _element.querySelector('.cart-popup__empty-item').classList.add('cart-popup__empty-item_active')
        }
      }
    }

    function formatePrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
    }
  }
}())
