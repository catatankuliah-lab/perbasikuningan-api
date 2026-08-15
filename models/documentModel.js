const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Document extends Model {}

Document.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    title: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    type: { 
        type: DataTypes.STRING(50), 
        allowNull: false // Contoh: 'Regulation', 'Schedule', 'Result'
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: false
    },
    event_id: {
        type: DataTypes.UUID,
        allowNull: true // Bisa null jika dokumen bersifat umum (tidak terikat event)
    }
}, {
    sequelize,
    modelName: "Document",
    tableName: "documents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Document.associate = function (models) {
    // Relasi ke User (Pembuat Dokumen)
    Document.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    // Relasi ke Event
    Document.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
};

module.exports = Document;