const express = require("express");

const sequelize = require("./utli/database");

const bodyparser = require("body-parser");

const Expense = require("./models/expense");
const user = require("./models/user");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expense");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.use(userRoutes);
app.use("/expense", expenseRoutes);

user.hasMany(Expense);
Expense.belongsTo(user);

sequelize
  .sync()
  //.sync({ force: true })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
