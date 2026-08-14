// models/procurementModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Procurement extends Model {}

Procurement.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Procurement",
    tableName: "procurements",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Procurement.associate = function (models) {
  Procurement.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
};

module.exports = Procurement;