const signup = document.getElementById("signup");
signup.addEventListener("submit", onSubmit);


function onSubmit(e) {
  e.preventDefault();

  let signupObj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  axios
    .post("http://localhost:3000/user/signup", signupObj)
    .then((response) => {
      console.log(response.data.message);
      alert(`User signup Sucessfull with Email`);
      window.location.href = "./login.html";
    })
    .catch((err) => {
      if(err.response.data.error){
        document.body.innerHTML += `<span class='text-danger'>${err.response.data.error}</span>`;
    } else {
        console.log(err);
    }
    });
}
