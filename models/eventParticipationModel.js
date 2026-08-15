const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class EventParticipation extends Model {}

EventParticipation.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    event_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    club_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: "EventParticipation",
    tableName: "event_participations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

EventParticipation.associate = function (models) {
    // Relasi ke Event
    EventParticipation.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
    // Relasi ke Club
    EventParticipation.belongsTo(models.Club, { foreignKey: "club_id", as: "club" });
};

module.exports = EventParticipation;