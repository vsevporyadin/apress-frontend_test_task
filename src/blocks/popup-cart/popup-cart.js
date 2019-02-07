'use strict';

(function () {
  window.CartPopup = CartPopup;

  function CartPopup (visibleTime) {
   
    let _hidePopup,
        _list,
        emptyElement,
        _listOnCart =[],
       _element = document.createElement('div');

    _element.className = 'popup-cart'

    let _cartPopupTemplate = 
    `<div class="popup-cart__container">
      <div class="popup-cart__header">
      <h3 class="popup-cart__title">Вы добавили в корзину:</h3>
      </div>
      <div class="popup-cart__body">
      <div class="popup-cart__empty popup-cart__item">Корзина пуста</div>
      </div>
      <div class="popup-cart_footer">
        <button class="popup-cart__to-cart">Перейти в корзину</button>
      </div>
     </div>
    `;

    _element.addEventListener('mouseover', function (e) {
      clearTimeout(_hidePopup)
    })

    _element.addEventListener('mouseout', function (e) {
      hide()
    })
    this.returnObj = function () {
      render()
      return _element
    }
    this.active = function active () {
      _element.classList.add('popup-cart_active')
      hide()
    }
    this.addCart = function (data) {
     emptyElement = _element.querySelector('.popup-cart__empty');
     if(emptyElement){
      emptyElement.remove();
     }
     if( _listOnCart.indexOf( data.id) == -1){
      _listOnCart.push(data.id)
    let item = document.createElement('div');
    let price = parseFloat(data.price).toLocaleString('ru-RU');
      item.className = 'popup-cart__item';
      item.dataset.id = data.id;
      item.innerHTML = `
      <div class="popup-cart__container-img">
        <img src="` +  data.img + `" class="popup-cart__img"/>
      </div>
      <div class="popup-cart__desc">
      <div class="popup-cart__item-name">` +  data.title + `</div>
      <div class="popup-cart__item-price">` +  price + `  руб.</div>
      </div>
      <div class="popup-cart__close">X</div>
      `;
      _list.appendChild(item)
       }
      this.active()

    }

    function hide () {
      clearTimeout(_hidePopup)
      _hidePopup = setTimeout(function () {
        _element.classList.remove('popup-cart_active')
      }, 1500)
    }


    function render () {
      _element.innerHTML = _cartPopupTemplate
      _list = _element.querySelector('.popup-cart__body')
    }

     _element.addEventListener('click', function (e) {
      removeItem(e);
    }) 

    function removeItem(e) {
      let target = e.target
      if (target.classList.contains('popup-cart__close')) {
        let currentItem = target.closest('.popup-cart__item');
       let  indexItem = currentItem.dataset.id;
        currentItem.remove();
      _listOnCart.splice(_listOnCart.indexOf(indexItem), 1);
        if (_list.children.length == 0) {
          _list.innerHTML =' <div class="popup-cart__empty popup-cart__item">Корзина пуста</div>';
        }
      }
    }

  }
}())
