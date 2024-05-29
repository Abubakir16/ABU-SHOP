let cats = document.querySelector(".cats");
let load = document.querySelector(".load");
let load2 = document.querySelector(".load2");
let productParent = document.querySelector(".product");
let catigory;
let products;
async function getCatigory() {
  load.innerHTML = `<img src="https://i.gifer.com/ZKZg.gif" alt="" />`;
  try {
    let response = await fetch(
      "https://hadzhi2003.pythonanywhere.com/api/v1/categories/"
    );
    let api = await response.json();
    catigory = api.results;
    catigory.forEach((element) => {
      cats.innerHTML += `
        <p class="category__item" id= ${element.id} >${element.name}</p>
      `;
    });

    cats.addEventListener("click", clickCatElement);
    let allProduct = document.querySelector(".all");
    let activeBtns = document.querySelectorAll(".category__item");

    function clickCatElement(item) {
      let catID = item.target.id;
      if (catID) {
        getProductByID(catID).then(renderProductInEkran);
      }
    }
    async function getProductByID(id) {
      try {
        let response = await fetch(
          `https://hadzhi2003.pythonanywhere.com/api/v1/product/?category=${id}`
        );

        let api = await response.json();

        if (response.status === 200) {
          return api.results;
        } else {
          console.log("false");
        }
      } catch (error) {
        console.log(error);
      }
    }
    function renderProductInEkran(api) {
      productParent.innerHTML = "";

      api?.forEach((item) => {
        productParent.innerHTML += `
        <div class="box">
            <div class="image">
                <img src="${item.image}"
                            alt="img">
            </div>
            <div class="name">
                    <h3>${item.name}</h3>
            </div>
            <div class="title">
                <div class="price">
                    <div class="priceProduct">
                        <p>Цена:</p>
                        <p class="cost">${item.price}</p>
                    </div>

                    <div class="shop" onclick="toCart(${item.id})">
                        <i class="ri-shopping-cart-2-fill"></i>
                    </div>
                </div>
            </div>
          </div>
      `;
      });
    }
    allProduct.addEventListener("click", () => {
      getFullProduct();
    });
    
    activeBtns.forEach((item) => {
      item.addEventListener("click", addAndRemoveActive);
    });
    function addAndRemoveActive(elem) {
      activeBtns.forEach((item) => {
        item.classList.remove("active");
      });

      elem.target.classList.add("active");
    }
  } catch (error) {
    console.log(error);
  } finally {
    load.classList.add("active");
  }
}
getCatigory().then(getFullProduct);

function toCart(clickedElementID) {
  const product = products.find((item) => item.id == clickedElementID);
  const cartLocal = JSON.parse(localStorage.getItem("products")) || [];
  const foodIndex = cartLocal.findIndex((item) => item.id == clickedElementID);
  const productToCard = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1,
  };

  if (foodIndex == -1) {
    cartLocal.push(productToCard);
  }

  localStorage.setItem("products", JSON.stringify(cartLocal));
  productRenderInCard();
}

async function getFullProduct() {
  productParent.innerHTML = "";
  load2.innerHTML = `<img src="https://i.gifer.com/ZKZg.gif" alt="" />`;

  try {
    let response = await fetch(
      "https://hadzhi2003.pythonanywhere.com/api/v1/product/"
    );
    let api = await response.json();
    products = api.results;
    if (response.status === 200) {
      products.forEach((product) => {
        productParent.innerHTML += `
          <div class="box">
            <div class="image">
                <img src="${product.image}"
                            alt="img">
            </div>
            <div class="name">
                    <h3>${product.name}</h3>
            </div>
            <div class="title">
                <div class="price">
                    <div class="priceProduct">
                        <p>Цена:</p>
                        <p class="cost">${product.price}</p>
                    </div>

                    <div class="shop" onclick="toCart(${product.id})">
                        <i class="ri-shopping-cart-2-fill"></i>
                    </div>
                </div>
            </div>
          </div>
    `;
      });

      let select = document.querySelector("#select");
      select.addEventListener("change", () => {
        productParent.innerHTML = "";
        let selectValue = select.value;
        if (selectValue === "menshe") {
          let sorted = products.sort((a, b) => {
            return a.price - b.price;
          });

          sorted.forEach((item) => {
            productParent.innerHTML += `
             <div class="box">
            <div class="image">
                <img src="${item.image}"
                            alt="img">
            </div>
            <div class="name">
                    <h3>${item.name}</h3>
            </div>
            <div class="title">
                <div class="price">
                    <div class="priceProduct">
                        <p>Цена:</p>
                        <p class="cost">${item.price}</p>
                    </div>

                    <div class="shop" onclick="toCart(${item.id})">
                        <i class="ri-shopping-cart-2-fill"></i>
                    </div>
                </div>
            </div>
          </div>
           `;
          });
        } else {
          let sorted2 = products.sort((a, b) => {
            return b.price - a.price;
          });
          sorted2.forEach((item) => {
            productParent.innerHTML += ` 
            <div class="box">
            <div class="image">
                <img src="${item.image}"
                            alt="img">
            </div>
            <div class="name">
                    <h3>${item.name}</h3>
            </div>
            <div class="title">
                <div class="price">
                    <div class="priceProduct">
                        <p>Цена:</p>
                        <p class="cost">${item.price}</p>
                    </div>

                    <div class="shop"  onclick="toCart(${item.id})">
                        <i class="ri-shopping-cart-2-fill"></i>
                    </div>
                </div>
            </div>
          </div>
           `;
          });
        }
      });
    }
  } catch (error) {
  } finally {
    load2.style.display = "none";
  }
}
let productLocal = [];
