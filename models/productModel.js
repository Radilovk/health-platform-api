// Model for products in the online store

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Product = db.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING, 
        allowNULL: false,
    },
    price: {
        type: DataTypes.FLOAT),
        allowNULL: false
    },
    description: {
        type: DataTypes.STRING, 
        allowNULL: true
    }
}, {
    tableName: 'products'
});

module.exports = Product;
