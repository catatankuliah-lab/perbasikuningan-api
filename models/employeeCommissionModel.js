// models/employeeCommissionModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class EmployeeCommission extends Model {}

EmployeeCommission.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "EmployeeCommission",
    tableName: "employee_commissions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

EmployeeCommission.associate = function (models) {
  EmployeeCommission.belongsTo(models.Employee, { foreignKey: "employee_id", as: "employee" });
  EmployeeCommission.belongsTo(models.Transaction, { foreignKey: "transaction_id", as: "transaction" });
};

module.exports = EmployeeCommission;