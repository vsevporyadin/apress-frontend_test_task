'use strict';

(function () {
  window.Listing = Listing

 function Listing (option) {
let cart_obj = option.cart_obj || null,
    order_obj = option.order_obj || null,
    append_block = option.appendBlock,
    data = option.data,
    list = document.createElement('div');
    list.className = 'listing' 
let item_name = "listing__item item-list",
    button_buyName = "item-list__button_buy",
    button_cartName = "item-list__button_to-cart";
if(!data){
    console.error('Данные листинга товаров не были получены!')
} else{
  renderListing();
}
function renderListing(){
   data.forEach(function (data) {
        let item = renderItem(data)
        list.appendChild(item)
      })
 document.querySelector(".container").appendChild(list);
  let button_buy = list.querySelectorAll('.' + button_buyName),
      button_cart = list.querySelectorAll('.' + button_cartName);

button_buy.forEach(function(item) {
   item.addEventListener('click',  function (e) {
      if(order_obj){
         let id =  this.closest(".item-list").dataset.id -1;
        order_obj.show(data[id]);
        return
      } else{
        console.error('Обьект "order_obj" не определен')
        return
      }
    });
});
button_cart.forEach(function(item){
    item.addEventListener('click', function (e) {
         if(cart_obj){
        let id =  this.closest(".item-list").dataset.id -1;
        cart_obj.addCart(data[id]);
        return
      } else{
        console.error('Обьект "cart_obj" не определен')
        return
      }
    });
});
}
function renderItem(data){
   let item = document.createElement('div');
       item.className = item_name;
       item.dataset.id =  data.id;
  let price = parseFloat(data.price).toLocaleString('ru-RU');
   let templateItem = `
        <div class="item-list item-list__image">
           <img class="item-list__pic" src="`+  data.img  + `">
        </div>
        <div class="item-list__desc">
           <div class="item-list__title">`+  data.title  + `</div>
           <div class="item-list__price">`+ price  + ` руб.</div>

        </div>
        <div class="item-list__buttons">
           <button class="item-list__button `+ button_buyName + `">Заказать</button>
           <button class="item-list__button ` + button_cartName +`"/>В корзину</button>
        </div>
        `;
        item.innerHTML = templateItem;
      return item;
}
}
}())
