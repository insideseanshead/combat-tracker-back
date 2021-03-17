module.exports = function(sequelize, DataTypes) {
    var Encounter = sequelize.define('Encounter', {
        name: DataTypes.STRING,
    });

    Encounter.associate = function(models) {
        Encounter.belongsTo(models.Campaign);
    }

    return Encounter; 
}