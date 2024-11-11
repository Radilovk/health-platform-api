// Model for Products
module.exports = function (sequelize, db) {
  const Product = dbdefine('Product', {
    productId: {
      type: sequelize.INT,
      primaryKey: true,
    },
    productName: {
      type: sequelize.STRING,
      required: true
    },
    price: {
      type: sequelize.FLOAT,
      required: true
    },
    description: {
      type: sequelize.STRING,
      allowNonUll: true
    },
    stockQuantity: {
      type: sequelize.INT,
      defaultValue: 0
    },
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE
  });
  return Product;
};