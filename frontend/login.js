const login = document.getElementById("login-id");
login.addEventListener("submit", onSubmit);


function onSubmit(e) {
  e.preventDefault();
  
  let loginObj = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  axios
    .post("http://localhost:3000/user/login", loginObj)
    .then((response) => {
      console.log(response.data.message);
      alert("Login Sucessfull");
      localStorage.setItem("token", response.data.token);
      window.location.href = "./expense.html";
    })
    .catch((err) => {
      if(err.response.data.error){
        document.body.innerHTML += `<span class='text-danger'>${err.response.data.error}</span>`;
    } else {
        console.log(err);
    }
    });
    
}
