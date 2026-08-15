const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class MatchOfficial extends Model {}

MatchOfficial.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    match_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    official_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: "MatchOfficial",
    tableName: "match_officials",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false // Kita hanya butuh created_at sesuai permintaan
});

MatchOfficial.associate = function (models) {
    // Relasi ke Pertandingan
    MatchOfficial.belongsTo(models.Match, { foreignKey: "match_id", as: "match" });
    // Relasi ke Official (Wasit/Petugas)
    MatchOfficial.belongsTo(models.Official, { foreignKey: "official_id", as: "official" });
};

module.exports = MatchOfficial;