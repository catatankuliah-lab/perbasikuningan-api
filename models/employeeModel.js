// models/employeeModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Employee.associate = function (models) {
  // 🛑 Relasi langsung ke Transaction dihapus karena employee_id pindah ke TransactionItems
  // Hubungkan employee ke transaction_items & employee_commissions
  Employee.hasMany(models.TransactionItems, { foreignKey: "employee_id", as: "transactionItems" });
  Employee.hasMany(models.EmployeeCommission, { foreignKey: "employee_id", as: "commissions" });
};

module.exports = Employee;