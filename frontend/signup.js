let signup = document.getElementById("signup");

signup.addEventListener("click", (e) => {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  //   if (name == "") {
  //     let element = document.querySelector(".popup");
  //     let n_element = document.createElement("div");
  //     n_element.className = "toast";
  //     n_element.innerText = "*name cannot empty";
  //     element.appendChild(n_element);
  //     setTimeout(() => {
  //       n_element.remove();
  //     }, 2000);
  //     return;
  //   }
  //   if (email == "") {
  //     let element = document.querySelector(".popup");
  //     let n_element = document.createElement("div");
  //     n_element.className = "toast";
  //     n_element.innerText = "*email cannot empty";
  //     element.appendChild(n_element);
  //     setTimeout(() => {
  //       n_element.remove();
  //     }, 2000);
  //     return;
  //   }
  //   if (pass == "") {
  //     let element = document.querySelector(".popup");
  //     let n_element = document.createElement("div");
  //     n_element.className = "toast";
  //     n_element.innerText = "*password cannot empty";
  //     element.appendChild(n_element);
  //     setTimeout(() => {
  //       n_element.remove();
  //     }, 2000);
  //     return;
  //   }
  if (name == "") {
    let n = "*name cannot empty";
    popup(n);
    return;
  }
  if (email == "") {
    let e = "*email cannot empty";
    popup(e);
    return;
  }
  if (pass == "") {
    let p = "*password cannot empty";
    popup(p);
    return;
  }

  let user = { name, email, pass };

  axios
    .post("http://localhost:3000/user/signup", user)
    .then((user) => {
      let response = user.data.message;
      popup(response);
      if (user.data.success == true) {
        window.location.href = "./login.html";
      }
    })
    .catch((err) => {
      console.log(err);
      let error = err.response.data.original.code;
      if (error == "ER_DUP_ENTRY") {
        let errRes = "*email already registered";
        popup(errRes);
      }
    });
});

function popup(data) {
  let element = document.querySelector(".popup");
  let n_element = document.createElement("div");
  n_element.className = "toast";
  n_element.innerText = data;
  element.appendChild(n_element);
  setTimeout(() => {
    n_element.remove();
  }, 2000);
}
