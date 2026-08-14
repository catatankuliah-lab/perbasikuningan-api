// models/customerModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    vehicle_plate: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Customer.associate = function (models) {
  Customer.hasMany(models.Transaction, {
    foreignKey: "customer_id",
    as: "transactions",
  });
};

module.exports = Customer;