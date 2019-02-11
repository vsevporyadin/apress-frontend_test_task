function Render(parent) {
    let _parent = parent;

    function _get(path, obj) {
        let fb = '${' + path + '}';
        return path.split('.').reduce(function (res, key)
        {
            return res[key] || fb
        }, obj);
    }

    function _parseTpl(template, map) {
        return template.replace(/\$\{.+?}/g,function (match)
        {
            const path = match.substr(2, match.length - 3).trim();
            return _get(path, map);
        });
    }

    // Рендер карточки товара в листинге
    function _galleryItem(product) {
        const template =
            "<div class='gallery-item__img-container img-container'>" +
                "<div class='img-wrapper'>" +
                    "<img class='gallery-item__img' src='${img}' alt='${title}'>" +
                "</div>" +
            "</div>" +
            "<div class='gallery-item__props'>" +
                "<h2 class='gallery-item__title'>${title}</h2>" +
                "<div class='gallery-item__price'>${price} руб.</div>" +
            "</div>" +
            "<div class='gallery-item__buttons'>" +
                "<button class='gallery-item__button gallery-item__button-order'>Заказать</button>" +
                "<button class='gallery-item__button gallery-item__button-cart'>В корзину</button>" +
            "</div>";

        let item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = _parseTpl(template,product);
        // Добавляем отслеживание на кнопки
        item.querySelector('.gallery-item__button-order').addEventListener('click', function() { _orderPopup(product) });
        item.querySelector('.gallery-item__button-cart').addEventListener('click', function() { _cartPopup(product) });

        return item;
    }

    // Рендер попапа заказа
    function _orderPopup(product) {
        const template =
            "<div class='order-popup__content'>" +
                "<form class='order-popup__form' action='#'>" +
                    "<span class='order-popup__button-close button-close'></span>" +
                    "<h2 class='order-popup__title'>${title}</h2>" +
                    "<div class='row'>" +
                        "<div class='col'>" +
                            "<div class='order-popup__img-container img-container'>" +
                                "<div class='img-wrapper'>" +
                                    "<img src='${img}' alt='${title}' class='order-popup__img'>" +
                                "</div>" +
                            "</div>" +
                            "<div class='order-popup__price'>${price} руб.</div>" +
                        "</div>" +
                        "<div class='col'>" +
                            "<label class='order-popup__comment-label' for='order-comment'>Комментарий к заказу:</label>" +
                            "<textarea class='order-popup__comment' name='comment' id='order-comment' rows='5'></textarea>" +
                        "</div>" +
                    "</div>" +
                    "<label class='order-popup__phone-label' for='order-number'>Ваш телефон *:</label>" +
                    "<input class='order-popup__phone' type='text' name='number' id='order-number' required>" +
                    "<button class='order-popup__button-submit'>Отправить</button>" +
                "</form>" +
            "</div>";

        let popup = document.createElement('div');
        popup.classList.add('order-popup');
        popup.innerHTML = _parseTpl(template,product);

        // Удаляем попап если клик вне содержимого
        popup.addEventListener('click',function (event)  {
            let target = event.target;
            if (target === popup) {
                popup.parentElement.removeChild(popup);
            }
        });

        // Удаляем если клик на кнопку закрыть
        popup.querySelector('.order-popup__button-close').addEventListener('click', function() {
            popup.parentElement.removeChild(popup);
        });

        // Удаляем при сабмите формы
        popup.querySelector('.order-popup__form').addEventListener('submit', function(e) {
            popup.parentElement.removeChild(popup);
            e.preventDefault();
        });

        _parent.appendChild(popup);
    }


    // Рендер попапа корзины
    function _cartPopup(product) {
        const template =
            "<div class='cart-popup__content'>" +
                "<div class='cart-popup__header'>" +
                    "<div class='cart-popup__label'>Вы добавили в корзину:</div>" +
                "</div>" +
                "<div class='row'>" +
                    "<div class='col'>" +
                        "<span class='cart-popup__button-close button-close'></span>" +
                        "<div class='card-popup__img-container img-container'>" +
                            "<div class='img-wrapper'>" +
                                "<img src='${img}' alt='${title}' class='order-popup__img'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='col'>" +
                        "<h2 class='cart-popup__title'>${title}</h2>" +
                        "<div class='cart-popup__price'>${price} руб.</div>" +
                    "</div>" +
                "</div>" +
                "<a href='#' class='cart-popup__button-cart'>Перейти в корзину</a>" +
            "</div>";

        let popup = document.createElement('div');
        popup.classList.add('cart-popup');
        popup.innerHTML = _parseTpl(template,product);

        // Удаляем если клик на кнопку закрыть
        popup.querySelector('.cart-popup__button-close').addEventListener('click', function() {
            popup.parentElement.removeChild(popup);
            clearTimeout(delayRemove);
        });

        // Удаляем через 10 секунд
        let delayRemove = setTimeout(function () {
            if (popup.parentElement) popup.parentElement.removeChild(popup);
        },10000);

        // Удаляем предыдущий попап
        let oldPopup = document.querySelector('.cart-popup');
        if (oldPopup) oldPopup.parentElement.removeChild(oldPopup);

        _parent.appendChild(popup);
    }


    // Рендер листинга товаров
    this.gallery = function (products) {
        const template = "<div class='gallery__wrapper'></div>";
        let gallery = document.createElement('div');
        gallery.classList.add('gallery');
        gallery.innerHTML = template;

        let galleryWrapper = gallery.querySelector('.gallery__wrapper');

        for (let i = 0; i < products.length; i++) {
            galleryWrapper.appendChild(_galleryItem(products[i]));
        }

        _parent.appendChild(gallery);
    }
}
