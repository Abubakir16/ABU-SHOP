let eye__false = document.querySelector(".eye__false");
let eye__true = document.querySelector(".eye__true");
let eyeParent = eye__false.closest(".email_blog");
let inpPass = eyeParent.querySelector("input");

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
let close = document.querySelector(".close");

close.addEventListener("click", () => {
  location.pathname =
    "//C:/Users/User/Documents/projects/ABU-SHOP/index/index.html";
});

// =======================================================================//
let inputs = document.querySelectorAll("form input");

let btnLog = document.querySelector(".btn__log");
let errro = document.querySelectorAll(".errro");
let userDatas = {};
let userErrors = {};

function handlechange(e) {
  let send = {
    [e.target.name]: e.target.value,
  };

  Object.assign(userDatas, send);
  console.log(userDatas);
}

function geterror(e) {
  return userErrors[e] || "";
}

inputs.forEach((item) => {
  item.addEventListener("input", handlechange);
});

btnLog.addEventListener("click", () => {
  async function sentLogin() {
    btnLog.innerHTML = "loading...";

    try {
      let response = await fetch(
        "https://hadzhi2003.pythonanywhere.com/api/v1/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDatas),
        }
      );

      let api = await response.json();

      if (response.status === 200) {
        localStorage.setItem("id", api.id);
        localStorage.setItem("name", api.first_name);
        localStorage.setItem("token", api.token_key);

        location.pathname =
          "//C:/Users/User/Documents/projects/ABU-SHOP/index/index.html";
      } else {
        userErrors = api;

        errro.forEach((item) => {
          item.innerHTML = geterror(item.id);
        });
      }

      console.log(api);
    } catch (error) {
    } finally {
      btnLog.innerHTML = "Войти";
    }
  }
  sentLogin();
});
  