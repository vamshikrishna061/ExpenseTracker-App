const login = document.getElementById("login-id");
login.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log("vammy");
  let loginObj = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  axios
    .post("http://localhost:3000/user/login", loginObj)
    .then((result) => {
      console.log(result.data.message);
      alert("Login Sucessfull");
    })
    .catch((err) => {
      console.log(err.response.data);
      //document.body.innerHTML += `<button onclick="window.location.href = '../html/login.html'">Reload</button>`;
      document.body.innerHTML += err.response.data.customMessage;
    });
}
