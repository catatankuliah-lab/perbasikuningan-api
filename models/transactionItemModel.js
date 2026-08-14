// models/transactionItemModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class TransactionItems extends Model {}

TransactionItems.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price_at_transaction: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    commission_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00,
    },
  },
  {
    sequelize,
    modelName: "TransactionItems",
    tableName: "transaction_items",
    timestamps: false,
  }
);

TransactionItems.associate = function (models) {
  TransactionItems.belongsTo(models.Transaction, { foreignKey: "transaction_id", as: "transaction" });
  TransactionItems.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  TransactionItems.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
};

module.exports = TransactionItems;