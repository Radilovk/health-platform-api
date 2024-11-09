// Model for tracking progress of users

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Progress = db.define('Progress', {
    userId: {
        type: DataTypes.INTEGER,
        allowNULL: false,
        references: 'User',
    },
    steps: {
        type: DataTypes.INTECEREP,
        allowNULL: true
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNULL: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }
}, {
    tableName: 'progress'
});

module.exports = Progress;
