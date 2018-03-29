'use strict';

/**
 * Listing products module
 *
 * @param {boolean} global
 * @param {Array} data
 * @param {string} containerSelector
 * @param {number} cartVisibleTime
 */

(function (global, data, containerSelector, cartVisibleTime) {
  if (global) {
    window.Listing = Listing
    window.CartPopup = CartPopup
  } else {
    let cart = new CartPopup(cartVisibleTime)
    document.body.appendChild(cart.getElement())

    let listing = new Listing(data, cart)
    document.querySelector(containerSelector).appendChild(listing.getElement())
  }

  /**
   * Cart poput class
   * this.getElement() - return HTML element
   * this.active() - displaying cart element for *_visibleTime* seconds
   * this.add() - adding new product to card and display it (call this.active())
   *
   * @constructor
   * @param {number} visibleTime
   */

  function CartPopup (visibleTime) {
    // Constructor {
    let _visibleTime = visibleTime || 2500
    let _hideTimeout
    let _dataArray = []
    let _list

    let _cartPopupTemplate = document.getElementById('cart-poput-template').innerHTML
    let _cartPopupItemTemplate = document.getElementById('cart-poput-item-template').innerHTML
    let _element = document.createElement('div')

    _element.addEventListener('mouseover', function (e) {
      clearTimeout(_hideTimeout)
    })

    _element.addEventListener('mouseout', function (e) {
      hide()
    })

    _element.addEventListener('click', function (e) {
      let target = e.target

      // "To card" button listening
      if (target.classList.contains('cart-popup__to-cart-btn')) {
        let sendingStr = '\n'

        for (let i = 0; i < _dataArray.length; i++) {
          sendingStr += _dataArray[i].id + ', ' + _dataArray[i].title + ', ' + _dataArray[i].price + '\n'
        }

        alert('Sending data: ' + sendingStr + '\n' + 'Cart will be cleared')
        clean()
        return
      }

      // Close button listening
      if (target.classList.contains('cart-popup__close-btn')) {
        let currentItem = target.closest('.cart-popup__item')
        let currentId = currentItem.dataset.id

        for (let i = 0; i < _dataArray.length; i++) {
          if (_dataArray[i].id == currentId) {
            _dataArray.splice(i, 1)
            break
          }
        }

        currentItem.remove()

        if (_list.children.length == 1) {
          _element.querySelector('.cart-popup__empty-item').style.display = 'block'
        }
      }
    })
    // } Constructor

    this.getElement = function () {
      render()
      return _element
    }

    this.active = function active () {
      _element.style.top = '5px'
      _element.style.opacity = 1
      hide()
    }

    this.addItem = function (itemData) {
      _dataArray.push(itemData)

      _element.querySelector('.cart-popup__empty-item').style.display = 'none'
      let item = document.createElement('li')
      item.className = 'cart-popup__item'
      item.innerHTML = _cartPopupItemTemplate

      item.querySelector('.cart-popup__img img').src = itemData.img
      item.querySelector('.cart-popup__title').innerHTML = itemData.title
      item.querySelector('.cart-popup__price').innerHTML = formatePrice(itemData.price)
      item.dataset.id = itemData.id

      item.style.background = '#e6e6e6'
      setTimeout(function () { item.style.background = '' }, 100)
      _list.insertBefore(item, _list.firstChild)

      _list.scrollTop = 0
      this.active()
    }

    function hide () {
      clearTimeout(_hideTimeout)
      _hideTimeout = setTimeout(function () {
        _element.style.opacity = 0
        setTimeout(function () { _element.style.top = '-10000px' }, 200)
      }, _visibleTime)
    }

    function clean () {
      _dataArray = [];
      [].forEach.call(
        _element.querySelectorAll('.cart-popup__item'),
        function (item) { item.remove() }
      )
      _element.querySelector('.cart-popup__empty-item').style.display = 'block'
    }

    function render () {
      _element.className = 'cart-popup'
      _element.innerHTML = _cartPopupTemplate
      _list = _element.querySelector('.cart-popup__list')
    }
  }

  /**
   * Order popup class
   * this.getElement() - return HTML element
   * this.setData() - sed new data and update HTML element
   * this.close() - destroing element
   *
   * @constructor
   * @param {Object} data
   */

  function OrderPopup (data) {
    // Constructor {
    let _self = this
    let _data = data
    let _mask

    let _orderPopupTemplate = document.getElementById('order-popup-template').innerHTML
    let _element = document.createElement('div')

    _element.addEventListener('click', function (e) {
      let target = e.target
      if (target.closest('.order-popup__close-btn') || target.closest('.mask')) {
        _self.close()
      }
    })

    _element.addEventListener('submit', function (e) {
      e.preventDefault()
      alert(
        'Sending data: ' + _data.id + ', ' + _data.title + ', ' + _data.price + '\n' +
        _element.querySelector('textarea').value + ', ' + _element.querySelector('.order-popup__phone-field').value
      )
      _self.close()
    })
    // } Constructor

    this.getElement = function () {
      _render()
      return _element
    }

    this.setData = function (data) {
      _data = data
      _render()
    }

    this.close = function () {
      _element.style.opacity = 0
      _mask.style.opacity = 0

      _element.querySelector('form').reset()
      setTimeout(function () {
        _element.remove()
      }, 250)
    }

    function _render () {
      _element.className = 'order-popup'
      _element.innerHTML = _orderPopupTemplate
      _element.querySelector('textarea').focus()
      _element.querySelector('.order-popup__title').innerHTML = _data.title
      _element.querySelector('.order-popup__price').innerHTML = formatePrice(_data.price)
      _element.querySelector('.order-popup__img img').src = _data.img
      _mask = _element.querySelector('.mask')

      setTimeout(function () { _mask.style.opacity = 0.7 }, 0)
      setTimeout(function () { _element.style.opacity = 1 }, 0)
    }
  }

  /**
   * Product list class
   * this.getElement() - return HTML element
   * this.setData() - sed new data and update HTML element
   *
   * @constructor
   * @param {Array} data
   * @param {CartPopup} cart
   */

  function Listing (data, cart) {
    // Constructor {
    let _itemTemplate = document.getElementById('listing-template').innerHTML
    let _data = data
    let _element = document.createElement('div')

    _element.addEventListener('click', function (e) {
      let target = e.target

      if (target.classList.contains('listing__buy-btn')) {
        let itemData
        _data.forEach(function (elem) {
          if (elem.id == target.closest('.listing__item').dataset.id) {
            itemData = elem
          }
        })
        let orderPopup = new OrderPopup(itemData)
        document.body.appendChild(orderPopup.getElement())
      }

      if (target.classList.contains('listing__add-btn')) {
        let itemData
        _data.forEach(function (elem) {
          if (elem.id == target.closest('.listing__item').dataset.id) {
            itemData = elem
          }
        })
        cart.addItem(itemData)
      }
    })
    // } Constructor

    this.getElement = function () {
      _render()
      return _element
    }

    this.setData = function (data) {
      _data = data
      _render()
    }

    function _render () {
      _element.className = 'listing'
      _element.innerHTML = ''

      let list = document.createElement('ul')
      list.className = 'listing__list'

      _data.forEach(function (itemData, i) {
        let item = createItem(itemData)
        list.appendChild(item)
      })

      _element.appendChild(list)
    }

    function createItem (itemData) {
      let item = document.createElement('li')
      item.className = 'listing__item'
      item.innerHTML = _itemTemplate

      item.querySelector('.listing__img img').src = itemData.img
      item.querySelector('.listing__title').innerHTML = itemData.title
      item.querySelector('.listing__price').innerHTML = formatePrice(itemData.price)
      item.dataset.id = itemData.id

      return item
    }
  }

  /**
   * Formate price 1000000 to 10 000 000 руб.
   *
   * @param {number} price
   * @returns {string}
   */

  function formatePrice (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
  }
}(false, API.products, '.product-listing-wrapper', 1700))

// Global usage example
// let cart = new CartPopup(1700)
// document.body.appendChild(cart.getElement())
// let listing = new Listing(API.products, cart)
// document.querySelector('.product-listing-wrapper').appendChild(listing.getElement())
