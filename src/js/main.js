console.log(API.products);
for (i=0;i<API.products.length;i++){
    
    document.getElementById("output").insertAdjacentHTML('beforeend', '<div class="card-product"> <img class="img-product" src="'+ API.products[i].img+ '"> <div class="info-product"> <p class="name-product">'+ API.products[i].title+'</p> <p class="price-product">'+ API.products[i].price+ ' руб.</p> </div> <div class="buttons-product"> <div onclick="order('+i+')" class="btn-buy">Заказать</div> <div onclick="basket('+i+')" class="btn-add-shopping-list">В корзину</div> </div> </div>');
}

function order(id){
    console.log(id);
    document.getElementById("main").insertAdjacentHTML('beforeend','<div id="popup" class="popup-registration"> <div id="closePopup" class="btn-close" onclick="closePopup()">x</div> <p class="title-popup-registration">'+API.products[id].title+'</p> <div class="popup-block-product"> <div class="popup-info-product"> <img class="popup-img-product" src="'+ API.products[id].img+ '"></img> <p class="popup-price-product">'+ API.products[id].price+ ' руб.</p> </div> <div class="popup-comment"> <p class="title-comment">Комментарий к заказу:</p> <textarea class="comment" type="text"></textarea> </div> </div> <div class="popup-phone"> <p class="title-phone">* Ваш телефон:</p> <input class="phone" type="text"> </div> <div class="btn-send">Отправить</div> </div>');
    document.getElementById("popup").style.display = "block";
};
function closePopup(){
    document.getElementById("popup").style.display = "none";
    document.getElementById("popup").remove();
};

function basket(id){
    document.getElementById("main").insertAdjacentHTML('beforeend', '<div id="popup-basket" class="popup-shopping-list"> <div class="cssarrow"></div> <div class="popup-title-shopping-list"> <p class="title-shopping-list">Вы добавили в корзину:</p> </div> <div class="popup-shopping-list-info-product"> <img src="'+API.products[id].img+'"class="popup-shopping-list-img-product"></img> <div class="popup-shopping-list-block-info"> <p class="popup-shopping-list-comment-product">'+API.products[id].title+'</p> <p class="popup-shopping-list-price-product">'+API.products[id].price+' руб.</p> </div> </div> <div id="btnclose" class="btn-go-shopping-list" onclick="btnclose()">Перейти в корзину</div> </div>');
    document.getElementById("popup-basket").style.display = "block";
};
function btnclose(){
    document.getElementById("popup-basket").style.display="none";
    document.getElementById("popup-basket").remove();
}