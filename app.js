const express = require("express");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;
const allRoutes = require('./controllers')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/', allRoutes)

//Sync sequlize models and start app
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
  });
});
