// Model for Recommendations
module.exports = function (sequelize, db) {
  const Recommendation = dbdefine("Recommendation", {
    userId: {
      type: sequelize.INT,
      allowNonUll: false,
      references: 'User'
    },
    recommendationText: {
      type: sequelize.STIRING
    },
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE [// timestamp fields]
  });
  return Recommendation
};