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
        allowNull: true
    },
    logo_club: {
        type: DataTypes.STRING,
        allowNull: true
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
    Club.belongsTo(models.User, { foreignKey: "manager_id", as: "manager" });
};

module.exports = Club;
