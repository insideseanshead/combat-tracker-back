module.exports = function(sequelize, DataTypes) {
    var Campaign = sequelize.define('Campaign', {
        name: DataTypes.STRING,
    });

    Campaign.associate = function(models) {
        Campaign.belongsTo(models.User);
        Campaign.hasMany(models.Encounter);
        Campaign.hasMany(models.Character);
    }

    return Campaign; 
}