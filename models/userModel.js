const sequelize = require('sequelize');

const User = sequelize.define('User,' {
  email: {type: sequelize.STRING, allowNull: false, unique: true},
  goals: {type: sequelize.JSON, allowNull: true},
  preferences:: {type: sequelize.JSON, obaligatory: true},
  settings: {
    type: sequelize.JSON,
    default: {} /* default structure for custom settings */
  },
});

module.exports = User;