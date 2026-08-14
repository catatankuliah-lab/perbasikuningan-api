const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Player extends Model {}

Player.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    club_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    identity_photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ktp_file: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Player",
    tableName: "players",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Player.associate = function (models) {
    // Relasi: Player tergabung dalam satu Club
    Player.belongsTo(models.Club, { foreignKey: "club_id", as: "club" });
};

module.exports = Player;