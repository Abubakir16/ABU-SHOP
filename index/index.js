let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun");
let body = document.querySelector(".body");
let logo = document.querySelectorAll(".logo_blog img");
let voyti = document.querySelector(".voyti");
let getTheme;

let voti_inner = document.querySelector(".voti_inner");

voti_inner.addEventListener("click", () => {
  location.pathname =
    "//C:/Users/User/Documents/projects/ABU-SHOP/index/login/login.html";
});

let getID = localStorage.getItem("token") || false;
if (getID) {
  let getAvatar = JSON.parse(localStorage.getItem("admin"));
  voyti.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `<img class="my_acc" src="${getAvatar.avatar}" alt="" />`;
  voyti.appendChild(div);
}

let myAcc = document.querySelector(".my_acc");

myAcc.addEventListener("click", () => {
  location.pathname =
    "//C:/Users/User/Documents/projects/ABU-SHOP/index/admin/admin.html";
});

moon.addEventListener("click", () => {
  localStorage.setItem("dark", "dark");
  localStorage.removeItem("light");

  location.reload();
});
sun.addEventListener("click", () => {
  localStorage.setItem("light", "light");
  localStorage.removeItem("dark");

  location.reload();
});

let getDArk = localStorage.getItem("dark");
let getLight = localStorage.getItem("light");

if (!!getDArk) {
  body.classList.add("dark");
  sun.style.display = "block";
  moon.style.display = "none";
  logo.forEach((item) => {
    item.src = "./assets/image/logo_dark.png";
  });
}

if (!!getLight) {
  body.classList.remove("dark");
  sun.style.display = "none";
  moon.style.display = "block";
  logo.forEach((item) => {
    item.src = "./assets/image/logo_light.png";
  });
}
