const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
    const Monster = sequelize.define("Monster", {
        monster_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            AUTO_INCREMENT
        },
        img: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        weaponSkill: {
            type: DataTypes.STRING
        },
        balisticSkill: {
            type: DataTypes.STRING
        },
        strength: {
            type: DataTypes.STRING
        },
        toughness: {
            type: DataTypes.STRING
        },
        agility: {
            type: DataTypes.STRING
        },
        intelligence: {
            type: DataTypes.STRING
        },
        willpower: {
            type: DataTypes.STRING
        },
        fellowship: {
            type: DataTypes.STRING
        },
        actions: {
            type: DataTypes.STRING
        },
        wounds: {
            type: DataTypes.STRING
        },
        strenghtBonus: {
            type: DataTypes.STRING
        },
        toughnessBonus:{
            type: DataTypes.STRING
        },
        movement :{
            type: DataTypes.STRING
        },
        magic: {
            type: DataTypes.STRING
        },
        insanityPoints: {
            type: DataTypes.STRING
        },
        fatePoints: {
            type: DataTypes.STRING
        },
        skills: {
            type: DataTypes.STRING
        },
        talents: {
            type: DataTypes.STRING
        },
        specialRules: {
            type: DataTypes.STRING
        },
        armour: {
            type: DataTypes.STRING
        },
        armourPoints: {
            type: DataTypes.STRING
        },
        weapons: {
            type: DataTypes.STRING
        },
        slaughterMargin: {
            type: DataTypes.STRING
        },
        PRIMARY_KEY (monster_id)
    })

    return Monster
}