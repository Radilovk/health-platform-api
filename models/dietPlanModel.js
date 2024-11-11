// Model to store diet plan information
export function(Sequelize, MySql) {
  return Sequelize.Model('dietPlan, {
    userId: {
      type: Sequelize.INTEGER,
      reference: 'Users',
      allowNULL: false
    },
    participants: {
      type: Sequelize.JSON,// stores daily details
      allowNULL: true
    },
    createdAt: {
      type: Sequelize.DATE,
      default: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,// tracking modification
      default: Sequelize.NOW
    }
  });
}