// number-product
$("input.input-qty").each(function () {
  var $this = $(this),
    qty = $this.parent().find(".is-form"),
    min = Number($this.attr("min")),
    max = Number($this.attr("max"));
  if (min == 0) {
    var d = 0;
  } else d = min;
  $(qty).on("click", function () {
    if ($(this).hasClass("minus")) {
      if (d > min) d += -1;
    } else if ($(this).hasClass("plus")) {
      var x = Number($this.val()) + 1;
      if (x <= max) d += 1;
    }
    $this.attr("value", d).val(d);
  });
});

// change tab
const a = document.querySelector.bind(document);
const aa = document.querySelectorAll.bind(document);

const tabs = aa(".tab-item");
const panes = aa(".tab-pane");

const tabActive = a(".tab-item.active");
const line = a(".tabs .subline");

requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    a(".tab-item.active").classList.remove("active");
    a(".tab-pane.active").classList.remove("active");
    9;
    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");
    // console.log(tab);
  };
});

// get id api

const url = new URLSearchParams(location.search);
const productId = url.get("id");
const productName = document.querySelector("#product-name");
const productThumbnail = document.querySelector("#product-thumbnail");
const productPrice = document.querySelector("#product-price");
const nameProduct = document.querySelector(".name");


// console.log(productId);

fetch(`https://6217947571e7672e53843858.mockapi.io/product/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const { name, price, rating, thumbnail } = data;
    productName.innerText = name;
    productPrice.innerText = "$" + price;
    productThumbnail.src = thumbnail;
    nameProduct.innerText = name;
  });




$(document).ready(async () => {
  const baseURL = "https://6217947571e7672e53843858.mockapi.io/";

  const respond = await fetch(baseURL + 'subproduct')
  const goods = await respond.json();
  const swiperWrapper = document.querySelector('.swiper-wrapper')
  function renderProduct(goods) {
    swiperWrapper.innerHTML = ""
    for (let x of goods) {
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
      swiperWrapper.innerHTML += `
      <div class="swiper-slide">
        <div class="thumbnail">
            <a href=""><img src="${x.thumbnail}"alt=""></a>
            <h4 class="discount">-16%</h4>
            <i class="fa-solid fa-heart"></i>
            <h2>Add to card</h2>
        </div>
        <div class="infor">
            <h3>${x.name}</h3>
            <h2>$${x.price}</h2>
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
  }
 renderProduct(goods)

});

 



const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 4,
  spaceBetween: 40,
  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar

  autoplay: {
    delay: 5000,
  },
});
