'use strict'

// Star
let cart = new CartPopup()
let listing = new Listing(document.querySelector('.product-listing-wrapper'), cart)
listing.render(API.products)

/**
 * Formate price 1000000 to 10 000 000 руб.
 * 
 * @param {number} price 
 * @returns {string}
 */
function formatePrice (price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' руб.'
}

/**
 * Cart poput class
 * new CartPopup() - creating empty cart object (hidden)
 * this.active() - displaying cart element for 2.5 seconds
 * this.add() - adding new product to card and display it
 * 
 * @constructor
 */

function CartPopup () {
  let self = this
  let hideTimeout
  let dataArray = []

  let cartPopupTemplate = document.getElementById('cart-poput-template').innerHTML
  let cartPopupItemTemplate = document.getElementById('cart-poput-item-template').innerHTML

  let elem = document.createElement('div')
  elem.className = 'cart-popup'
  elem.innerHTML = cartPopupTemplate
  document.body.appendChild(elem)

  let list = elem.querySelector('.cart-popup__list')

  elem.addEventListener('mouseover', function (e) {
    clearTimeout(hideTimeout)
  })

  elem.addEventListener('mouseout', function (e) {
    hide()
  })

  elem.addEventListener('click', function (e) {
    let target = e.target

    // "To card" button listening
    if (target.classList.contains('cart-popup__to-cart-btn')) {
      let sendingStr = '\n'

      for (let i = 0; i < dataArray.length; i++) {
        sendingStr+= dataArray[i].id + ', ' + dataArray[i].title + ', ' + dataArray[i].price + '\n'
      }
      
      alert('Sending data: ' + sendingStr + '\n' + 'Cart will be cleared')
      
      dataArray = []
      elem.querySelectorAll('.cart-popup__item').forEach(function (item) { 
        item.remove() 
      })
      elem.querySelector('.cart-popup__empty-item').style.display = 'block'

      return
    }

    // Close button listening
    if (target.classList.contains('cart-popup__close-btn')) {
      let currentItem = target.closest('.cart-popup__item')
      let currentId = currentItem.dataset.id

      dataArray.forEach(function (elem, i) {
        if (elem.id == currentId) {
          dataArray.splice(i, 1)
          return
        }
      })

      currentItem.remove()

      if (list.children.length == 1) {
        elem.querySelector('.cart-popup__empty-item').style.display = 'block'
      }

      return
    }
  })

  this.active = function active () {
    elem.style.top = '5px'
    elem.style.opacity = 1

    hide()
  }

  this.addItem = function (itemData) {
    dataArray.push(itemData) 

    elem.querySelector('.cart-popup__empty-item').style.display = 'none'
    let item = document.createElement('li')
    item.className = 'cart-popup__item'
    item.innerHTML = cartPopupItemTemplate

    item.querySelector('.cart-popup__img img').src = itemData.img
    item.querySelector('.cart-popup__title').innerHTML = itemData.title
    item.querySelector('.cart-popup__price').innerHTML = formatePrice(itemData.price)
    item.dataset.id = itemData.id

    item.style.background = '#e6e6e6'
    setTimeout(function () { item.style.background = '' }, 100)
    list.insertBefore(item, list.firstChild)

    list.scrollTo(0, 0);
    this.active()
  }

  function hide () {
    clearTimeout(hideTimeout)
    hideTimeout = setTimeout(function () {
      elem.style.opacity = 0
      setTimeout(function () { elem.style.top = '-10000px' }, 200)
    }, 2500)
  }
}

/**
 * Order popup class
 * new OrderPopup() - creating poput whith the passind data
 * this.close() - destroing element
 * 
 * @constructor
 * @param {Object} data 
 */

function OrderPopup (data) {
  let self = this
  let orderPopupTemplate = document.getElementById('order-popup-template').innerHTML
  let currentScroll = window.pageYOffset

  let elem = document.createElement('div')
  elem.className = 'order-popup'
  elem.innerHTML = orderPopupTemplate
  document.body.appendChild(elem)
  
  let mask = document.createElement('div')
  mask.className = 'mask'
  document.body.appendChild(mask)
  setTimeout(function() { mask.style.opacity = 0.7 }, 0)

  elem.querySelector('.order-popup__title').innerHTML = data.title
  elem.querySelector('.order-popup__price').innerHTML = formatePrice(data.price)
  elem.querySelector('.order-popup__img img').src = data.img

  setTimeout(function(){ elem.style.opacity = 1 }, 0)

  this.close = function () {
    document.removeEventListener('scroll', lockScroll)

    elem.style.opacity = 0
    mask.style.opacity = 0

    elem.querySelector('form').reset()
    setTimeout(function () {
      elem.remove()
      mask.remove() 
    }, 250)
  }

  elem.querySelector('.order-popup__close-btn').addEventListener('click', function(e) {
    self.close()
  })

  mask.addEventListener('click', function(e) {
    self.close()
  })

  function lockScroll (e) {
    window.scrollTo(0, currentScroll);
  }
  document.addEventListener('scroll', lockScroll)

  elem.addEventListener('submit', function(e) {
    e.preventDefault()
    alert(`Data sending:
    id: ${data.id}
    title: ${data.title}
    price: ${data.price}
    comment: ${elem.querySelector('textarea').value}
    phone: ${elem.querySelector('.order-popup__phone-field').value}`)
    self.close()
  })
}

/**
 * Product list class
 * new Listing() - binding object to parent HTMLElement and some CartPoput
 * render() - geting data array and rendering it. Recalling this allow to udate data
 * 
 * @constructor
 * @param {HTMLElement} container 
 * @param {CartPopup} cart 
 */

function Listing (container, cart) {
  let itemTemplate = document.getElementById('listing-template').innerHTML
  let data

  container.addEventListener('click', function(e) {
    let target = e.target

    if (target.classList.contains('listing__buy-btn')) {
      let itemData = data.find(function (elem) {
        return elem.id == target.closest('.listing__item').dataset.id
      })
      new OrderPopup(itemData)
    }

    if (target.classList.contains('listing__add-btn')) {
      let itemData = data.find(function (elem) {
        return elem.id == target.closest('.listing__item').dataset.id
      })
      cart.addItem(itemData)
    }
  })

  this.render = function (arr) {
    data = arr
    container.innerHTML = ''

    let elem = document.createElement('ul')
    elem.className = 'listing__list'

    data.forEach(function(itemData, i) {
      let item = createItem(itemData)
      elem.appendChild(item)
    })
    
    container.appendChild(elem)
  }

  function createItem (itemData) {
    let item = document.createElement('li')
    item.className = 'listing__item'
    item.innerHTML = itemTemplate

    item.querySelector('.listing__img img').src = itemData.img
    item.querySelector('.listing__title').innerHTML = itemData.title
    item.querySelector('.listing__price').innerHTML = formatePrice(itemData.price)
    item.dataset.id = itemData.id

    return item
  }
}
