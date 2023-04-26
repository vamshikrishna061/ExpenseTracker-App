let editingExpenseId = null;
const token = localStorage.getItem("token");

const expense = document.getElementById("expense");
expense.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let expenseObj = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };

  if (editingExpenseId === null) {
    axios
      .post("http:/localhost:3000/expense/post-expense", expenseObj, {
        headers: { 'Authorization': token },
      })
      .then((response) => {
        addNewLineElement(response.data);
      })
      .catch((err) => {
        document.body.innerHTML += "<h6> Submit failed try again</h6>";
        console.log(err);
      });
  } else {
    axios
      .post(
        `http:/localhost:3000/expense/edit-expense/${editingExpenseId}`,
        expenseObj,
        { headers: { 'Authorization': token } }
      )
      .then((response) => {
        const parRes = JSON.parse(response.config.data);
        addNewLineElement(parRes);
      })
      .catch((err) => {
        document.body.innerHTML += "<h6> Submit failed try again</h6>";
        console.log(err);
      });
    editingExpenseId = null;
  }
}
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function enablePremium(){
  document.getElementById('premium').setAttribute('hidden','hidden');
  document.getElementById('leaderboard-btn').removeAttribute('hidden');
  document.getElementById('if-premium').innerHTML = '<p>You are now a Premium User</p>' + document.getElementById('if-premium').innerHTML;
}

if (document.readyState == "loading") {
  const decodeToken = parseJwt(token);
  
  const isAdmin = decodeToken.isPremiumUser;
  if(isAdmin){enablePremium()}

  axios
    .get("http:/localhost:3000/expense/get-expenses", {
      headers: { 'Authorization': token },
    })
    .then((result) => {
      result.data.forEach((element) => {
        addNewLineElement(element);
      });
    })
    .catch((err) => {
      console.log(err);
      document.body.innerHTML +=
        "<h6> Error: Failed to load data from server</h6>";
    });
}

function addNewLineElement(expenseDetails) {
  const ul = document.getElementById("tracker");
  const li = document.createElement("li");

  li.appendChild(
    document.createTextNode(
      "Rs" +
        expenseDetails.amount +
        " - Category:" +
        expenseDetails.category +
        " - Description:" +
        expenseDetails.description +
        " "
    )
  );

  const delBtn = document.createElement("input");
  delBtn.id = "delete";
  delBtn.type = "button";
  delBtn.value = "delete";
  delBtn.addEventListener("click", () => {
    axios.get(
      `http:/localhost:3000/expense/delete-expense/${expenseDetails.id}`,
      { headers: { 'Authorization': token } }
    );
    li.remove();
  });
  delBtn.style.border = "2px solid red";
  delBtn.style.marginRight = "5px";
  li.appendChild(delBtn);

  const editBtn = document.createElement("input");
  editBtn.id = "edit";
  editBtn.type = "button";
  editBtn.value = "Edit";
  editBtn.addEventListener("click", () => {
    document.getElementById("amount").value = expenseDetails.amount;
    document.getElementById("description").value = expenseDetails.description;
    document.getElementById("category").value = expenseDetails.category;
    li.remove();
    editingExpenseId = expenseDetails.id;
    console.log(editingExpenseId);
  });
  editBtn.style.border = "2px solid green";
  li.appendChild(editBtn);
  ul.appendChild(li);
}

document.getElementById("premium").onclick = async function (e) {
  const response = await axios.get(
    "http://localhost:3000/purchase/premium-membership",
    { headers: { Authorization: token } }
  );
  
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      const result = await axios.post("http://localhost:3000/purchase/update-transaction-status",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { 'Authorization': token } });

      alert("You are now a premium user");
      localStorage.setItem("token", result.data.token);
      enablePremium();

      location.reload();
      
    },
  };

  const rzrp1 = new Razorpay(options);
  rzrp1.open();
  e.preventDefault();

  rzrp1.on("payment.failed", () => {
    axios.post(
      "http://localhost:3000/purchase/update-transaction-status",
      { order_id: response.data.order.id },
      { headers: { 'Authorization': token } }
    );
    alert("something went wrong");
    rzrp1.close();
  });
};

let leaderboardDisplayed = false;
let leaderboardElements = [];
let leaderboardList = document.getElementById("leaderboard-list");
let leaderboardBtn = document.getElementById("leaderboard-btn");
axios
  .get("http://localhost:3000/premium/show-leaderboard", {
    headers: { 'Authorization': token },
  })
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const li = document.createElement("li");
      li.id = "leaderboard-li";
      li.appendChild(document.createTextNode(` Name : ${res.data[i].name} ,`));
      li.appendChild(
        document.createTextNode(
          `Total Expense :Rs ${res.data[i].totalExpense || 0}`));
          leaderboardElements.push(li)
      
    }
  })
  .catch((err) => {
    console.log(err);
  });

leaderboardBtn.onclick = (e) => {
  e.preventDefault();
  

  if (leaderboardDisplayed) {
    leaderboardBtn.innerHTML = "Show Leaderboard";
    document.getElementById('leaderboard-tracker').setAttribute('hidden','hidden');
    leaderboardList.style.display = "none";
    leaderboardDisplayed = false;
  } else {
    leaderboardBtn.innerHTML = "Hide Leaderboard";
    document.getElementById('leaderboard-tracker').removeAttribute('hidden');
    leaderboardList.style.display = "block";
    leaderboardElements.forEach((element) => {
      leaderboardList.append(element);
    });
    leaderboardDisplayed = true;
  }
};


let reportBtn = document.getElementById('report-btn');
let reportDisplayed = false;
reportBtn.onclick = (e) => {
    e.preventDefault();
    const decodeToken = parseJwt(token);
    const isAdmin = decodeToken.isPremiumUser;

    if(reportDisplayed){
        reportDisplayed = false;
        document.getElementById('initial-tracker').removeAttribute('hidden');
        reportBtn.innerHTML = ' Expenses Report ';
        document.getElementById('report-dwn-btn').setAttribute('hidden','hidden');
        document.getElementById('report-tracker').setAttribute('hidden','hidden');

    } else {
        reportDisplayed = true;
        document.getElementById('initial-tracker').setAttribute('hidden','hidden');
        reportBtn.innerHTML = 'Hide Expenses Report';
        if(isAdmin){
        document.getElementById('report-dwn-btn').removeAttribute('hidden');
        }
        document.getElementById('report-tracker').removeAttribute('hidden');
    }

}