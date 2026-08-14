// models/transactionModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    payment_method: {
      type: DataTypes.STRING(30),
      defaultValue: "Cash",
    },
    cashier_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Transaction.associate = function (models) {
  Transaction.belongsTo(models.Customer, { foreignKey: "customer_id", as: "customer" });
  Transaction.hasMany(models.TransactionItems, { foreignKey: "transaction_id", as: "items" });
};

module.exports = Transaction;