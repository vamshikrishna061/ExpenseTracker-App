const signup = document.getElementById("signup");

signup.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  let user = { name, email, pass };
  axios
    .post("http://localhost:3000/user/signup", user)
    .then((user) => {
      console.log(user.data);
    })
    .catch((err) => {
      console.log(err);
      let error=err.response.data.original.code;
    if(error=='ER_DUP_ENTRY')
    {
      let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText='*email already registered';
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
        return;
    }
    });
});
