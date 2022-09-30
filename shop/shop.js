$(document).ready(async () => {
  const baseURL = "https://6217947571e7672e53843858.mockapi.io/";

  const res = await fetch(baseURL + "product");
  const data = await res.json();

  function renderProduct(data) {
    let html = "";
    for (let x of data) {
      const rate = (Math.ceil((x.rating * 2) / 100) / 2) * 5; // cái này để làm tròn kiểu 4.3 nó sẽ thành 4.0 :v
      let ratingHtml = "";
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
        <div class="product ${x.categories} hide">
            <div class="thumbnail">
                <a href="/product/?id=${x.id}"><img src="${
        x.thumbnail
      }" alt="" class = "product-img"></a>
                <h4 class="discount">-16%</h4>
                <a class='wishlist-button'><i class="fa-solid fa-heart"></i></a>
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
        alert("This item is already added to the cart!");
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
        event.preventDefault();
        buttonClicked.parentElement.parentElement.parentElement.remove();
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

var removeWishlistItemButtons = document.getElementsByClassName("remove-item");
for (var i = 0; i < removeWishlistItemButtons.length; i++) {
  var button = removeWishlistItemButtons[i];
  button.addEventListener("click", (event) => {
    var buttonClicked = event.target;

    buttonClicked.parentElement.parentElement.remove();
    // updateCartTotal();
  });
}

//   var quantityInputs = document.getElementsByClassName("cart-quantity-input");
//   for (var i = 0; i < quantityInputs.length; i++) {
//     var input = quantityInputs[i];
//     input.addEventListener("change", (event) => {
//       var input = event.target;
//       if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1;
//       }
//       updateCartTotal();
//     });
//   }

var addToWishlistButtons = document.getElementsByClassName("wishlist-button");
for (var i = 0; i < addToWishlistButtons.length; i++) {
  var button = addToWishlistButtons[i];
  button.addEventListener("click", (event) => {
    var wishlistButton = event.target;
    var wishlistShopItem = wishlistButton.parentElement.parentElement;

    const wishlistTitle =
      wishlistShopItem.getElementsByClassName("product-name")[0].innerText;
    const wishlistImageSrc =
      wishlistShopItem.getElementsByClassName("product-img")[0].src;
    const wishlistPrice =
      wishlistShopItem.getElementsByClassName("product-price")[0].innerText;
    addItemToWishlist(wishlistTitle, wishlistImageSrc, wishlistPrice);
    // updateWishlistTotal();
  });
}
// document
//   .getElementsByClassName("product-add")[0]
//   .addEventListener("click", () => {
//     alert("Thank you for your purchase");
//     var wishlistItems = document.getElementsByClassName("wishlist-item")[0];
//     while (wishlistItems.hasChildNodes()) {
//       wishlistItems.removeChild(wishlistItems.firstChild);
//     }
//     // updateWishlistTotal();
//   });

function addItemToWishlist(title, imageSrc, price) {
  var wishlistRow = document.createElement("div");
  wishlistRow.classList.add("wishlist-row");
  var wishlistItems = document.getElementsByClassName("wishlist-item")[0];
  var wishlistItemNames =
    wishlistItems.getElementsByClassName("wishlist-title");
  for (var i = 0; i < wishlistItemNames.length; i++) {
    if (wishlistItemNames[i].innerText == title) {
      alert("This item is already added to the cart!");
      return;
    }
  }
  var wishlistRowContents = `
    <div class="wishlist-pdt">
      <img src="${imageSrc}" alt="">
      <div class="desc">
        <span class="wishlist-title">${title}</span>
        <div class="wishlist-price">${price}</div>
        <button type="button" class="product-add">ADD TO CART</button>
      </div>
      <a href="" class="remove-item"><i class="fa-solid fa-circle-xmark"></i></a>

    </div>
    <div class="line"></div>
  `;

  wishlistRow.innerHTML = wishlistRowContents;
  wishlistItems.append(wishlistRow);
  wishlistRow
    .getElementsByClassName("remove-item")[0]
    .addEventListener("click", (event) => {
      var buttonClicked = event.target;
      event.preventDefault();
      buttonClicked.parentElement.parentElement.parentElement.remove();
      // updateCartTotal();
    });
  //   //   cartRow
  //   //     .getElementsByClassName("cart-quantity-input")[0]
  //   //     .addEventListener("change", (event) => {
  //   //       var input = event.target;
  //   //       if (isNaN(input.value) || input.value <= 0) {
  //   //         input.value = 1;
  //   //       }
  //   //       updateCartTotal();
  //   //     });
}

// **categoties

function filterProduct(value) {
  let buttons = document.querySelectorAll(".category");
  buttons.forEach((button) => {
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  console.log(buttons);

  let elements = document.querySelectorAll(".product");
  console.log(elements);
  elements.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains('lighting')) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

window.onload = () => {
  filterProduct("all")
}