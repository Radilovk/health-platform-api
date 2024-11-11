// Model for Diet Plan  
module.exports = function (sequelize, db) {
  const DietPlan = dbdefine('DietPlan', {
    userId: {
      type: sequelize.INT,
      allowNonUll: false,
      reperences: 'User'
    },
    planName: {
      type: sequelize.STRING,
      allowNonUll: false,
      validate: { not: null }
    },
    planDetails: {
      type: sequelize.JSON, allowNonUll: true
    },
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE // Standard columns for timestamps
  });
  return DietPlan;
};