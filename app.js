const path = require('path');
const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require("dotenv");
dotenv.config();

const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/order");
const Forgotpassword = require("./models/forgotpasswords");
const DownloadUrl = require('./models/downloadUrls')


const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const forgotPasswordRoutes = require("./routes/forgotpassword")

 const sequelize = require("./utli/database");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);



const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());


app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", forgotPasswordRoutes);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadUrl);
DownloadUrl.belongsTo(User);


sequelize
  .sync()
  //.sync({ force: true })
  .then((res) => {
    app.listen(3000, (err) => {     
      if (err) console.log(err);
      console.log("Server is listening for requests");
    });
  })

  .catch((err) => {
    console.log(err);
  });
