if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn_danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity_input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop_item_button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn_purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart_items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop_item_title')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop_item_img')[0].src
    addItemToCart(title, imageSrc)
}

function addItemToCart(title, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart_row')
    var cartItems = document.getElementsByClassName('cart_items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart_item_title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart_item cart_column">
            <img class="cart_item_img" src="${imageSrc}" width="100" height="100">
            <span class="cart_item_title">${title}</span>
        </div>
        <div class="cart_quantity cart_column">
            <input class="quantity_input" type="number" value="1">
            <button class="btn btn_danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn_danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity_input')[0].addEventListener('change', quantityChanged)
}

