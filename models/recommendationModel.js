// Model to store recommendations and track user preferences
export function(sequelize, mysql) {
  return sequelize.model('recommendation', {
    userId: {
      type: sequelize.INTEGER,
      reference: 'users',
      allowNull: false
    },
    recommendationText: {
      type: sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: sequelize.DATE,
      default: sequelize.NOW
    },
    updatedAt: {
      type: sequelize.DATE,
      default: sequelize.NOW
    }
  });
}