// models/expenseModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    receipt_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Expense",
    tableName: "expenses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Expense;