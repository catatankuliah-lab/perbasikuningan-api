const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Club extends Model {}

Club.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    club_name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    manager_id: { 
        type: DataTypes.UUID, 
        allowNull: true // Bisa null jika manager belum ditentukan
    }
}, {
    sequelize,
    modelName: "Club",
    tableName: "clubs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Club.associate = function (models) {
    // Relasi: Club dimiliki oleh satu User (Manager)
    Club.belongsTo(models.User, { foreignKey: "manager_id", as: "manager" });
};

module.exports = Club;