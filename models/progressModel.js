// Model for User Progress 
module.exports = function (sequelize, db) {
  const Progress = dbdefine('Progress', {
    userId: {
      type: sequelize.INT,
      allowNonUll: false,
      reperences: 'User'
    },
    steps: {
      type: sequelize.INT,
      defaultValue: 0,
      validate: { min: 0 }
    },
    calories: {
      type: sequelize.INT,
      defaultValue: 0,
      validate: { min: 0 }
    },
    date: {
      type: sequelize.DATE,
      defaultValue: new Date(),
      validate: { not: null }
    }
  });
  return Progress;
};