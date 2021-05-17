const Campaign = require("./Campaign");

module.exports = function(sequelize, DataTypes) {
    var Character = sequelize.define('Character', {
        name: DataTypes.STRING,
        player: DataTypes.STRING,
        weaponSkill: DataTypes.INTEGER,
        ballisticSkill: DataTypes.INTEGER,
        strength: DataTypes.INTEGER,
        toughness: DataTypes.INTEGER,
        agility: DataTypes.INTEGER,
        intellegence: DataTypes.INTEGER,
        willPower: DataTypes.INTEGER,
        fellowship:DataTypes.INTEGER,
        attacks: DataTypes.INTEGER,
        wounds: DataTypes.INTEGER,
        strengthBonus: DataTypes.INTEGER,
        toughnessBonus: DataTypes.INTEGER,
        movement: DataTypes.INTEGER,
        magic: DataTypes.INTEGER,
        insansityPoints: DataTypes.INTEGER,
        fatePoints: DataTypes.INTEGER
    });

    Character.associate = function(models) {
        Character.belongsTo(models.Campaign);
        Character.belongsTo(models.User)
    }

    return Character
}