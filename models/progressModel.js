// Model to store and track the user progress in health and fitness activities
export function(sequelize, mysql) {
  return sequelize.model('progress', {
    userId: {
      type: sequelize.INTEGER,
      reference: 'users',
      allowNull: false
    },
    stepsCount: {
      type: sequelize.INT,
      default: 0,
      validate: {\"min\": 0, \"max\": 30000}
    },
    caloriesArned: {
      type: sequelize.INT,
      default: 0,
      validate: {\"min\": 0, \"max\": 30000}
    },
    date: {
      type: sequelize.DATE,
      allowNull: false
    },
    createdAt: {
      type: sequelize.DATE, allowNull: false
    },
    updatedAt: {
      type: sequelize.DATE, allowNull: false
    }
  });
}