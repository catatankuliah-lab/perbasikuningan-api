// models/paymentModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Payment extends Model {}

Payment.init({
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    document_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    event_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    approver_id: { 
        type: DataTypes.UUID, 
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
    },  
    payment_method: {
        type: DataTypes.ENUM('Bank Transfer', 'E-Wallet', 'Credit Card', 'Debit Card', 'Other'),
        allowNull: false,
        defaultValue: 'Bank Transfer'
    },
    payment_status: {
        type: DataTypes.ENUM('Pending', 'Down Payment Paid', 'Full Paid', 'Failed'),
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

Payment.associate = function (models) {
    // Relasi ke Document (Bukti Bayar / Referensi Dokumen)
    Payment.belongsTo(models.Document, { foreignKey: "document_id", as: "document" });
    // Relasi ke User (Yang menyetujui pembayaran)
    Payment.belongsTo(models.User, { foreignKey: "approver_id", as: "approver" });
};

module.exports = Payment;