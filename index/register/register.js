let eye__false = document.querySelector(".eye__false");
let eye__true = document.querySelector(".eye__true");
let eyeParent = eye__false.closest(".email_blog");
let inpPass = eyeParent.querySelector("input");
let close = document.querySelector(".close");
eye__false.addEventListener("click", () => {
  inpPass.type = "text";
  eye__true.style.display = "block";
  eye__false.style.display = "none";
});
eye__true.addEventListener("click", () => {
  inpPass.type = "password";
  eye__true.style.display = "none";
  eye__false.style.display = "block";
});
close.addEventListener("click", () => {
  location.pathname =
    "//C:/Users/User/Documents/projects/ABU-SHOP/index/index.html";
});

// ============================================================//
let inputs = document.querySelectorAll("form input");
let btnReg = document.querySelector(".btn_reg");
let errro = document.querySelectorAll(".errro");
let avatar = document.querySelector(".avatar");

let userDatas = {
  email: "",
  first_name: "null",
  phone: null,
  last_name: null,
  password: null,
};
let userErrors = {};

let ava = document.querySelector("#avatar");
let placeAva = document.querySelector("#placeAva");
ava.onchange = (e) => {
 
};

function handlechange(e) {
  if (e.target.name in userErrors) {
    deleteErrors(e.target.name);
    errro.forEach((err) => {
      if (err.id == e.target.name) {
        err.innerHTML = "";
      }
    });
  }
  let send = {
    [e.target.name]: e.target.value,
  };

  Object.assign(userDatas, send);
}

function geterror(e) {
  // phone  password
  return userErrors[e] || "";
}

function deleteErrors(prop) {
  delete userErrors?.[prop];
}

inputs.forEach((item) => {
  item.addEventListener("input", handlechange);
});

btnReg.addEventListener("click", (e) => {
  e.preventDefault();
  async function sendData() {
    btnReg.innerHTML = `<img class="img_" src="https://i.gifer.com/ZKZg.gif" alt="">`;

    try {
      let form = document.querySelector("form");
      let formData = new FormData(form);

      let response = await fetch(
        "https://hadzhi2003.pythonanywhere.com/api/v1/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(userDatas),
        }
      );

      let api = await response.json();

      if (response.status === 200) {
        localStorage.setItem("id", api.id);
        localStorage.setItem("token", api.token);
        localStorage.setItem("admin", JSON.stringify(api));
        location.pathname =
          "//C:/Users/User/Documents/projects/ABU-SHOP/index/index.html";
      } else {
        userErrors = api;

        errro.forEach((err) => {
          err.innerHTML = geterror(err.id);
        });
        console.log(api);
        console.log(userErrors);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      btnReg.innerHTML = "Register";
    }
  }
  sendData();
});
