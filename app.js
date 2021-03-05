const express = require("express");
const { Sequelize } = require("sequelize");
const db = require("./models");

const app = express();

// Database
const database = require("./config/database");

// Index Route
app.get("/", (req, res) => res.sent("test"));

// Monster Routes

// Set Port
const PORT = process.env.PORT || 3000;

//Sync sequlize models and start app
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
  });
});
