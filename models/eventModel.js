const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Event extends Model {}

Event.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    organizer_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    title: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'planned', // planned, ongoing, completed, cancelled
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Event",
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Event.associate = function (models) {
    // Relasi: Event diselenggarakan oleh seorang User (Organizer)
    Event.belongsTo(models.User, { foreignKey: "organizer_id", as: "organizer" });
};

module.exports = Event;