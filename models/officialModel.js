const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Official extends Model {}

Official.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    license_level: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false // Contoh: Referee, Table Official, Commissioner
    }
}, {
    sequelize,
    modelName: "Official",
    tableName: "officials",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = Official;