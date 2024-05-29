let id = localStorage.getItem("id");
let admin = document.querySelector(".admin");
let load = document.querySelector(".load");
let editAcccc = document.querySelector(".editAcccc");
let innerEdirAcc = document.querySelector(".innerEdirAcc");
let innerEdirPass = document.querySelector(".innerEdirPass");
let editPass = document.querySelector(".editPass");
let deleteAcc = document.querySelector(".deleteAcc");
let getAvatar = JSON.parse(localStorage.getItem("admin"));
function editAcc() {
  editAcccc.classList.add("active");
}

editAcccc.addEventListener("click", () => {
  editAcccc.classList.remove("active");
});
innerEdirAcc.addEventListener("click", (e) => {
  e.stopPropagation();
});

async function getUser() {
  load.innerHTML = "loading...";
  try {
    let response = await fetch(
      `https://hadzhi2003.pythonanywhere.com/api/v1/auth/profile/${id}/`
    );

    let api = await response.json();

    if (response.status == 200) {
      admin.innerHTML += `
                        <img class="avatrat_img" src="${getAvatar.avatar}" alt="">
                        <div class="title">
                            <div>
                                <h1>${api.first_name}</h1>
                                <p>${api.last_name}</p>
                            </div>
                            <p class="phone">${api.phone}</p>
                            <div class="changes">
                                <button class="change_acc">Изменит акаунт</button>
                                <button class="change_pasword">Изменит парол</button>
                            </div>
                        </div>
            `;
    }

    let change_acc = document.querySelector(".change_acc");
    let editPassword = document.querySelector(".change_pasword");
    change_acc.addEventListener("click", () => editAcc());
    innerEdirAcc.innerHTML = `
     <div class="inputs">
                <form>
                    <div class="user_logo">
                        <img src="${getAvatar.avatar}" id="placeAva">
                        <input class="avatar" name="avatar" id="avatar" type="file">
                    </div>
                    <div class="parent">
                        <div>
                            <div class="name">
                                <input type="text" name="first_name" placeholder="Имя" value="${api.first_name}">
                            </div>

                            <div class="errro" id="first_name"></div>
                        </div>

                        <div>
                            <div class="name">
                                <input type="text" name="last_name" placeholder="Фамилия" value="${api.last_name}">
                            </div>

                            <div class="errro" id="last_name"></div>
                        </div>
                    </div>
                    <div class="email_blog">
                        <input type="tel" name="phone" placeholder="Телефон номер" value="${api.phone}">
                    </div>
                    <div class="errro" id="phone"></div>


                    <div class="email_blog">
                        <input type="email" name="email" placeholder="Email.." value="${api.email}">
                    </div>
                    <div class="errro" id="email"></div>
                    <div class="email_blog">
                        <i class="ri-eye-off-line eye__false"></i>
                        <i class="ri-eye-line eye__true"></i>
                        <input type="password" name="password" placeholder="Password..." value="${api.password}">
                    </div>
                    <div class="errro" id="password"></div>

                </form>
                <button class="btn_reg">Изменит акаунт</button>
    `;

    editPassword.addEventListener("click", () => {
      editPass.classList.add("active");
      innerEdirPass.innerHTML = `
         <div class="inputs">
                <form class="edit_pass">
                    <div class="email_blog">
                        <input type="password" name="old_password" placeholder="Старый парол" >
                    </div>
                    <div class="errro" id="old_password"></div>

                    <div class="email_blog">
                        <input type="password" name="new_password" placeholder="Новый парол" >
                    </div>
                    <div class="errro" id="new_password"></div>
                </form>
                <button class="btn_editPass">Изменит парол</button>
        `;
      editPasssword();
    });

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

    editPass.addEventListener("click", () => {
      editPass.classList.remove("active");
    });
    innerEdirPass.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // ----------------------------------//
  } catch (error) {
    console.log(error);
  } finally {
    load.style.display = "none";
  }
}

getUser().then(editAcaunt);

let data = {};
let errs = {};

function geterror(e) {
  return errs[e] || "";
}

function editAcaunt() {
  let btn_reg = document.querySelector(".btn_reg");
  console.log(btn_reg);
  let inouts = document.querySelectorAll("form input");
  let errors = document.querySelectorAll(".errro");

  inouts.forEach((itme) => {
    itme.addEventListener("input", handlechange);
  });

  let ava = document.querySelector("#avatar");
  let placeAva = document.querySelector("#placeAva");
  ava.onchange = (e) => {
    let b = e.target.files[0];
    let a = URL.createObjectURL(b);
    placeAva.src = a;
  };

  btn_reg.addEventListener("click", () => {
    btn_reg.innerHTML = "loading...";

    async function editSS() {
      try {
        let form = document.querySelector("form");
        let formData = new FormData(form);
        let response = await fetch(
          `https://hadzhi2003.pythonanywhere.com/api/v1/auth/profile/${id}/`,
          {
            method: "PUT",
            body: formData,
          }
        );

        let api = await response.json();

        if (response.status == 200) {
          localStorage.setItem("admin", JSON.stringify(api));
          location.reload();
        } else {
          errs = api;

          errors.forEach((item) => {
            item.innerHTML = geterror(item.id);
          });
          console.log(api);
        }
      } catch (error) {
      } finally {
        btn_reg.innerHTML = "Изменит акаунт";
      }
    }
    editSS();
  });
}
function handlechange(e) {
  let sent = {
    [e.target.name]: e.target.value,
  };

  Object.assign(data, sent);
  console.log(data);
}
let token = localStorage.getItem("token");
function editPasssword() {
  let btn_editPasword = document.querySelector(".btn_editPass");
  let inputs = document.querySelectorAll(".edit_pass input");
  console.log(inputs);
  let errro = document.querySelectorAll(".edit_pass .errro");
  inputs.forEach((item) => {
    item.addEventListener("change", handlechange);
  });

  let form = document.querySelector("form");

  console.log(form);

  btn_editPasword.addEventListener("click", () => {
    async function changePass() {
      btn_editPasword.innerHTML = "loading...";
      try {
        let response = await fetch(
          "https://hadzhi2003.pythonanywhere.com/api/v1/auth/change-password/",
          {
            method: "PUT",
            body: formData,
          }
        );

        let api = await response.json();

        if (response.status == 200) {
          window.location.pathname =
            "//C:/Users/User/Documents/projects/ABU-SHOP/index/login/login.html";
        } else {
          errs = api;
          errro.forEach((item) => {
            item.innerHTML = geterror(item.id);
          });
        }
      } catch (error) {
      } finally {
        btn_editPasword.innerHTML = "Изменит парол";
      }
    }
    changePass();
  });
}

deleteAcc.addEventListener("click", () => {
  async function deleteAcaunt() {
    deleteAcc.innerHTML = "loading...";

    try {
      let response = await fetch(
        `https://hadzhi2003.pythonanywhere.com/api/v1/auth/profile/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      localStorage.clear();
      window.location.pathname =
        "/C:/Users/User/Documents/projects/ABU-SHOP/index/index.html";
    } catch (error) {
    } finally {
      deleteAcc.innerHTML = "Удалит акаунт";
    }
  }
  deleteAcaunt();
});
