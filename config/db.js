
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Disable logging; set to true to enable
  define: {freezeTableName: true},
});

module.exports = db;
