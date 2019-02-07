'use strict';
 
 let cont = document.createElement('div');
    cont.className = 'container';
    document.body.appendChild(cont);
let cart = new CartPopup()
document.body.appendChild(cart.returnObj())

let order = new OrderPopup()
document.body.appendChild(order.returnObj())

let listing = new Listing({
    data: API.products,
    cart_obj: cart,
    order_obj: order,
    append_block: ".container"
  })

