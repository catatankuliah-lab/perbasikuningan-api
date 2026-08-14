// models/commissionRuleModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class CommissionRule extends Model {}

CommissionRule.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    service_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    commission_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "CommissionRule",
    tableName: "commission_rules",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

CommissionRule.associate = function (models) {
  CommissionRule.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
};

module.exports = CommissionRule;