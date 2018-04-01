'use strict';

/**
 * Использование всех модулей на одной странице
 */
let listing = new Listing({
    data: API.products,
    cartPopup: new CartPopup(1700),
    orderPopup: new OrderPopup()
  })
document.querySelector('.product-listing-wrapper').appendChild(listing.getElement())


/**
 * Использование листинга отдельно
 * Листинг может принимать слледующие параметры:
 *
 *  orderPopup: объет с реализованными методами getElement(): Element и show(data: {}): void
 *  или buyBtnListener с любым колбеком (в колбек будут переданы данные товара).
 *  При нажатии на кнопку "Заказать" будет вызван orderPopup.getElement() или buyBtnListener()
 *
 *  cartPopup: объет с реализованными методами getElement(): Element и addItem(data: {}): void
 *  или addToCartListener с любым колбеком (в колбек будут переданы данные товара).
 *  При нажатии на кнопку "В корзину" будет вызван cartPopup.getElement() или addToCartListener()
 *
 * Пример с колбеками:
 */
// let listing = new Listing({
//   data: API.products,
//   buyBtnListener: function (itemData) { alert(itemData.title) },
//   addToCartListener: function (itemData) { alert(itemData.title) }
// })
// document.querySelector('.product-listing-wrapper').appendChild(listing.getElement())


/**
 * Использование попапа заказа отдельно
 */
// let orderPopup = new OrderPopup()
// document.body.appendChild(orderPopup.getElement())
// let testBtn = document.createElement('button')
// testBtn.innerHTML = 'Test order popup'
// document.body.appendChild(testBtn)
// testBtn.addEventListener('click', function() {
//   orderPopup.show({
//     "id": 1, 
//     "title": "Выкатной детский диван Зайка производитель фабрика Blanes", 
//     "price": 11740,
//     "img": "assets/images/1.jpg"
//   })
// })


/**
 * Использование попапа корзины отдельно
 */
// let cartPopup = new CartPopup(1700)
// document.body.appendChild(cartPopup.getElement())
// let testBtn = document.createElement('button')
// testBtn.innerHTML = 'Test cart popup'
// document.body.appendChild(testBtn)
// testBtn.addEventListener('click', function() {
//   cartPopup.addItem({
//     "id": 1, 
//     "title": "Выкатной детский диван Зайка производитель фабрика Blanes", 
//     "price": 11740,
//     "img": "assets/images/1.jpg"
//   })
// })
