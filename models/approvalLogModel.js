// models/approvalLogModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class ApprovalLog extends Model {}

ApprovalLog.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    document_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    approver_id: { 
        type: DataTypes.UUID, 
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "ApprovalLog",
    tableName: "approval_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at" // Tetap ada secara default di Sequelize
});

ApprovalLog.associate = function (models) {
    // Relasi ke Document
    ApprovalLog.belongsTo(models.Document, { foreignKey: "document_id", as: "document" });
    // Relasi ke User (Approver)
    ApprovalLog.belongsTo(models.User, { foreignKey: "approver_id", as: "approver" });
};

module.exports = ApprovalLog;