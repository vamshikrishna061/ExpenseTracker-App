const express = require("express");

const sequelize = require("./utli/database");

const bodyparser = require("body-parser");

const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));

app.use(userRoutes);

sequelize.sync().then(app.listen(3000));
