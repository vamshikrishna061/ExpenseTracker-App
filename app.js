const express = require("express");

const sequelize = require("./utli/database");

const bodyparser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expense");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyparser.json());

app.use(userRoutes);
app.use("/expense", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
