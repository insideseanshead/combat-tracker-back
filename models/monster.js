module.exports = function(sequelize, DataTypes) {
    const Monster = sequelize.define("Monster", {
        img: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
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
        willPower: {
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
        strengthBonus: {
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
            type: DataTypes.TEXT
        },
        talents: {
            type: DataTypes.TEXT
        },
        specialRules: {
            type: DataTypes.TEXT
        },
        armour: {
            type: DataTypes.TEXT
        },
        armourPoints: {
            type: DataTypes.TEXT
        },
        weapons: {
            type: DataTypes.TEXT
        },
        slaughterMargin: {
            type: DataTypes.STRING
        }
    })

    return Monster
}

