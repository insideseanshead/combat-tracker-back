const Sequelize = require('sequelize')
module.exports = new Sequelize('combattracker_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });