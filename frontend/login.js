const login = document.getElementById("login");
login.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const pass = document.getElementById("password");

  let user = { email, pass };

  axios
    .post("https://localhost:3000/user/login", user)
    .then((user) => {
      console.log(user.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
