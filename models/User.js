const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        password:{
            type:DataTypes.STRING,
            required:true,
            validate:{
                len:[8]
            },
        },
            email:{
                type:DataTypes.STRING,
                unique:true
            }
    });

    User.associate = function(models) {
      User.hasMany(models.Campaign);
      User.hasMany(models.Encounter);
      User.hasMany(models.Character);
    }

    User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    return User; 
}