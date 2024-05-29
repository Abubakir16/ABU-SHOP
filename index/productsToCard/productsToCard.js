let korzina = document.querySelector(".korzina");
let korzinalocal = document.querySelector(".korzinalocal");
let innerKorzina = document.querySelector(".innerKorzina");
let totalss = document.querySelector(".totalss");
korzina.addEventListener("click", () => {
  korzinalocal.classList.add("active");
});
innerKorzina.addEventListener("click", (e) => {
  e.stopPropagation();
});
korzinalocal.addEventListener("click", () => {
  korzinalocal.classList.remove("active");
});
let getProducts;
function productRenderInCard() {
  let listCard = document.querySelector(".listCard");
  let quatity = document.querySelector(".quatityProduct");
  getProducts = JSON.parse(localStorage.getItem("products")) || false;
  listCard.innerHTML = "";
  let total1 = 0;
  let total_bill = document.querySelector(".total_bill");

  if (!!getProducts[0]) {
    totalss.classList.add("active");
    getProducts.forEach((element, i) => {
      listCard.innerHTML += `
            <div class="elemt_div">
                <img class="element_img" src="${element.image}" alt="" />
               <div class="dd">
                    <p>${element.name}</p>
                     <div class="ff">
                         <p>Цена:</p>
                         <h4>${element.price.toLocaleString()}</h4>
                     </div>  
               </div>
    
               <div class="sa">
                    <button class="btn_counter">-</button>
                      <div class="countrer">${element.quantity}</div>
                    <button class="btn_counterPlus">+</button>
               </div>
               <div class="delete__btn">
               <i class="ri-delete-bin-line"></i>
               </div>
            </div>
        `;

      let minusBtn = document.querySelectorAll(".btn_counter");
      let plusBtn = document.querySelectorAll(".btn_counterPlus");
      let counter = document.querySelectorAll(".countrer");
      let deleteProduct = document.querySelectorAll(".delete__btn");
      let spacePrice = document.querySelectorAll(".ff h4");

      minusBtn.forEach((item, i) => {
        item.addEventListener("click", () => {
          if (getProducts[i].quantity && counter[i].textContent > 1) {
            getProducts[i].quatity--;
            counter[i].textContent--;
            spacePrice[i].textContent =
              getProducts[i].price * counter[i].textContent;
            6;
          }
          getaAllSumm();
        });
      });

      deleteProduct.forEach((item, i) => {
        item.addEventListener("click", () => {
          getProducts.splice(i, 1);
          localStorage.setItem("products", JSON.stringify(getProducts));
          quantityCahnge();
          productRenderInCard();
          getaAllSumm();
        });
      });

      function getaAllSumm() {
        let spacePrice = document.querySelectorAll(".ff h4");
        let total_bill = document.querySelector(".total_bill");

        let totalok = [].reduce.call(
          spacePrice,
          (acc, item) => {
            let elem = parseInt(item.textContent);
            return acc + elem;
          },
          0
        );

        total_bill.innerHTML = totalok;
      }

      total1 += +getProducts[i].price;

      plusBtn.forEach((item, i) => {
        item.addEventListener("click", () => {
          getProducts[i].quatity++;
          counter[i].textContent++;
          spacePrice[i].textContent =
            getProducts[i].price * counter[i].textContent;
          getaAllSumm();
        });
      });
    });
    total_bill.innerHTML = total1;
    quatity.textContent = getProducts.length;

    function orderProduct() {
      let order_product = document.querySelector(".order_product");
      let order__product_true = document.querySelector(".order__product_true");
      order_product.addEventListener("click", () => {
        order__product_true.classList.add("active");

        setTimeout(() => {
          order__product_true.classList.remove("active");
          localStorage.removeItem("products");
          productRenderInCard();
          quantityCahnge();
        }, 2000);
      });
    }
    orderProduct();

    function quantityCahnge() {
      let quantity = document.querySelector(".quatityProduct");
      if (!!getProducts) {
        quantity.textContent = getProducts.length;
      } else {
        quantity.textContent = 0;
      }
    }

    function deleteproducts() {
      let deleteBtn = document.querySelector(".clear_korzina");

      deleteBtn.addEventListener("click", () => {
        localStorage.removeItem("products");
        productRenderInCard();
        quantityCahnge();
      });
    }
    deleteproducts();
  } else {
    totalss.classList.remove("active");
    listCard.innerHTML = `<img class="empty_box" src="https://media.tenor.com/CbNbvrguQ28AAAAM/empty-box-empty.gif" alt="" />`;
  }
  function search() {
    let search__blog = document.querySelector(".input_search");
    let btnSearch = document.querySelector(".search-btn");
    let product = document.querySelector(".product");
    let name = document.querySelector(".name h3");

    btnSearch.addEventListener("click", () => {
      let inputValue = search__blog.value;
      if (!!inputValue) {
        let filterProducts = products.filter((item) =>
          item.name.includes(inputValue)
        );
        product.innerHTML = "";

        filterProducts.map((item) => {
          product.innerHTML += `
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
        search__blog.placeholder = "Напиши что-то!!!";
        search__blog.classList.add("emty_inp");

        setTimeout(() => {
          search__blog.placeholder = "Поиск";
          search__blog.classList.remove("emty_inp");
        }, 2000);
      }
    });
  }
  search();
}
productRenderInCard();
