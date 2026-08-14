const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Match extends Model {}

Match.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    event_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    team_a_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    team_b_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    score_a: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    score_b: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    match_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Match",
    tableName: "matches",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Match.associate = function (models) {
    // Relasi ke Event
    Match.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
    // Relasi ke Club (Tim A)
    Match.belongsTo(models.Club, { foreignKey: "team_a_id", as: "team_a" });
    // Relasi ke Club (Tim B)
    Match.belongsTo(models.Club, { foreignKey: "team_b_id", as: "team_b" });
};

module.exports = Match;