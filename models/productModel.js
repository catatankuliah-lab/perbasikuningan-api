// models/productModel.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Product extends Model {}

Product.init(
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
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

// models/productModel.js
Product.associate = function (models) {
  Product.hasMany(models.TransactionItems, {
    foreignKey: "product_id",
    as: "transactionItems",
  });
  Product.hasMany(models.Procurement, {
    foreignKey: "product_id",
    as: "procurements",
  });
};

module.exports = Product;
