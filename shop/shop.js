$(document).ready(async () => {
  const baseURL = "https://6217947571e7672e53843858.mockapi.io/";

  const res = await fetch(baseURL + "product");
  const data = await res.json();
  // console.log(data);

  function renderProduct(data) {
    let html = "";
    for (let x of data) {
      const rate = (Math.ceil((x.rating * 2) / 100) / 2) * 5; // cái này để làm tròn kiểu 4.3 nó sẽ thành 4.0 :v
      let ratingHtml = "";
      console.log(rate);
      for (let i = 0; i < Math.floor(rate); ++i) {
        ratingHtml += `<i class="fa-solid fa-star"></i>`;
      }
      for (let i = 0; i < Math.round(rate - Math.floor(rate)); ++i) {
        ratingHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
      }
      for (let i = 0; i < 5 - Math.round(rate); ++i) {
        ratingHtml += `<i class="fa-regular fa-star"></i>`;
      }
      html += `
        <div class="product">
            <div class="thumbnail">
                <a href="/product/?id=${x.id}"><img src="${x.thumbnail}" alt="" class = "product-img"></a>
                <h4 class="discount">-16%</h4>
                <i class="fa-solid fa-heart"></i>
                <h2 class="shop-item-button">Add to card</h2>
            </div>
            <div class="infor">
                <h3 class = "product-name">${x.name}</h3>
                <h2 class = "product-price">$${x.price}</h2>
                <div class="ratings">
                    <div class="rating">
                       ${ratingHtml}
                    </div>
                    <div class="rating">
                        <h4>${x.rating} ratings</h4>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    return html;
  }

  $(".pagination-product").pagination({
    dataSource: data,
    pageSize: 12,
    pageRange: 2,
    callback: function (data, pagination) {
      const html = renderProduct(data);
      $(".products").html(html);
    },
  });

  // function loading() {
  var removeCartItemButtons = document.getElementsByClassName("remove-item");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", (event) => {
      var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      updateCartTotal();
    });
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", (event) => {
      var input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updateCartTotal();
    });
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", (event) => {
      var button = event.target;
      var shopItem = button.parentElement.parentElement;
     
      const title =
        shopItem.getElementsByClassName("product-name")[0].innerText;
      const imageSrc = shopItem.getElementsByClassName("product-img")[0].src;
      const price =
        shopItem.getElementsByClassName("product-price")[0].innerText;
      addItemToCart(title, imageSrc, price);
      updateCartTotal();
    });
  }
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", () => {
      alert("Thank you for your purchase");
      var cartItems = document.getElementsByClassName("cart-item")[0];
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
      }
      updateCartTotal();
    });
  

  function addItemToCart(title, imageSrc, price) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-item")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-title");
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    var cartRowContents = `
      <div class="pdt">
        <img src="${imageSrc}" alt="" class="cart-img">
        <div class="desc">
          <span class="cart-title">${title}</span>
          <div class="cart-price">${price}</div>
          <input class="cart-quantity-input" type="number" value="1">
        </div>
        <a href="" class="remove-item"><i class="fa-solid fa-circle-xmark"></i></a>
      </div> 
      <div class="line"></div>
  `;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("remove-item")[0]
      .addEventListener("click", (event) => {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
      });
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", (event) => {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
        }
        updateCartTotal();
      });
  }

  function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-item")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName("cart-price")[0];
      var quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  }
});
