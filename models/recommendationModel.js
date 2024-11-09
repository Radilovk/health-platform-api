// Model for storing recommendations for users

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Recommendation = db.define('Recommendation', {
    userId: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        references: 'User',
    },
    recommendationText: {
        type: DataTypes.STRING,
        allowNULL: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
}, {
    tableName: 'recommendations'
});

module.exports = Recommendation;
