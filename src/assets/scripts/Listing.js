'use strict';

(function () {
  window.Listing = Listing

   /**
   * Product list class
   * 
   * Public methods:
   * getElement() - return HTML element
   * setData() - sed new data and update HTML element
   * 
   * Constructor acepted opt.cartPopup or opt.buyBtnListener and opt.orderPopup or opt.addToCartListener
   *
   * @constructor
   * @param {Array<{id: nimber, title: string, price: number, img: string}>} opt.data
   * @param {CartPopup} opt.cartPopup (implement addItem({}): void)
   * @param {OrderPopup} opt.orderPopup (implement show({}): void)
   * @param {Function} opt.buyBtnListener function (itemData: {id: nimber, title: string, price: number, img: string})
   * @param {Function} opt.addToCartListener function (itemData: {id: nimber, title: string, price: number, img: string})
   */

  function Listing (opt) {
    // Constructor {
    let _itemTemplate =
      '<div class="listing__img">' +
        '<img alt="product picture">' +
      '</div>' +
      '<div class="listing__discript">' +
        '<p class="listing__title"></p>' +
        '<p class="listing__price"></p>' +
      '</div>' +
      '<div class="listing__controls">' +
        '<button class="listing__buy-btn">Заказать</button>' +
        '<button class="listing__add-btn">В корзину</button>' +
      '</div>'

    let _data = opt.data
    let _cartPopup = opt.cartPopup || null
    let _orderPopup = opt.orderPopup || null
    
    let _buyBtnListener = opt.buyBtnListener || null
    let _addToCartListener = opt.addToCartListener || null
    
    let _element = document.createElement('div')
    _element.className = 'listing'
    
    _element.addEventListener('click', function (e) {
      addToCartListener(e)
      orderButnListener(e)
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

    function orderButnListener(e) {
      let target = e.target

      if (target.classList.contains('listing__buy-btn')) {
        let itemData
        let itemElem = target.closest('.listing__item')

        for (let i = 0; i < _data.length; i++) {
          if (_data[i].id == itemElem.dataset.id) {
            itemData = _data[i]
            break
          }
        }

        if (_buyBtnListener) {
          _buyBtnListener(itemData)
          return
        }

        if (!_orderPopup) {
          console.error('orderPopup not found, you need to pass orderPopup objct or custom listener in Listing constructor opt')
          return
        }

        // Default buy button listener
        _orderPopup.show(itemData)
        return
      }
    }

    function addToCartListener (e) {
      let target = e.target

      if (target.classList.contains('listing__add-btn')) {
        let itemData
        let itemElem = target.closest('.listing__item')

        for (let i = 0; i < _data.length; i++) {
          if (_data[i].id == itemElem.dataset.id) {
            itemData = _data[i]
            break
          }
        }

        if (_addToCartListener) {
          _addToCartListener(itemData)
          return
        }

        if (!_cartPopup) {
          console.error('cartPopup not found, you need to pass cartPopup objct or custom listener in Listing constructor opt')
          return
        }

        // Default add to cart listener
        _cartPopup.addItem(itemData)
        return
      }
    }

    function formatePrice (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
    }
  }
}())
