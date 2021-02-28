const Sequelize = require('sequelize')
module.exports = new Sequelize('combat-tracker_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });