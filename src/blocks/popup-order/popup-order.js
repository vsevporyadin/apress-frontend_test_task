'use strict';

(function () {
  window.OrderPopup = OrderPopup

  function OrderPopup () {
     let _element = document.createElement('div')
    _element.className = 'popup-order';
    let _popup = this;
    let _back;
    let _data;
   function _render () {
   let price = parseFloat(_data.price).toLocaleString('ru-RU');
    let popupTemplate = `
   
     <form class="popup-order__form">
      <div class="popup-order__close">X</div> 
    <h2 class="popup-order__title">`+  _data.title + `</h2>
    <div class="popup-order__cont-image popup-order__3-col">
         <img src="`+  _data.img + `"  class="popup-order__image" />
         <div class="popup-order__price">`+  price + ` руб.</div>
    </div>
    <div class="popup-order__coment popup-order__9-col">
        <p class="popup-order__subtitle popup-order__3-col">Комментарий к заказу:</p>
        <textarea name="popup-order_textarea" class="popup-order__9-col popup-order_textarea popup-order__field"></textarea>
    </div>
    <div class="popup-order__phone_label popup-order__subtitle popup-order__3-col">Ваш телефон*:</div>
       <div class="popup-order__inputs popup-order__9-col">
        <input class="popup-order__field popup-order__field-phone" type="tel" required pattern="[0-9]{5,18}" placeholder="введите номер телефона">
        <br>
        <input class="popup-order__send" type="submit" value="Отправить">
    </div>
    </form>
    <div class="popup-order__background"></div>
    `;
    _element.innerHTML = popupTemplate;
      _back = _element.querySelector('.popup-order__background')
      _back.classList.add('popup-order__background-active')
      _element.classList.add('popup-order_active')
  }
  this.show = function (data) {
      if (!data) {
        console.error('You need to pass data object');;
        return;
      }
      _data = data;
      _render();
  }
  _element.addEventListener('click', function (e) {
      let target = e.target;
      if (target.closest('.popup-order__close') || target.closest('.popup-order__background')) {
        _popup.hide();
      };
       if (target.closest('.popup-order__close')) {
        _popup.hide();
      };
    })
    this.returnObj = function (data) {
      return _element;
    }
    this.hide = function () {
      _element.classList.remove('popup-order_active');
      _back.classList.remove('popup-order__background-active');
      _element.querySelector('form').reset();
    }

  }
}())
