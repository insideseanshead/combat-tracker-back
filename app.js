const express = require("express");
const db = require("./models");
const cors = require('cors')

// const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(cors())

// Routes
const routes = require("./controllers/")
app.use(routes);

//Sync sequlize models and start app
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
  });
});
