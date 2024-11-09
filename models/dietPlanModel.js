// Model for deticated diet plans

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DietPlan = db.define('DietPlan', {
    userId: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        references: 'User',
    },
    planDetails: {
        type: DataTypes.JSON,
        allowNULL: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
}, {
    tableName: 'det_plans'
});

module.exports = DietPlan;
