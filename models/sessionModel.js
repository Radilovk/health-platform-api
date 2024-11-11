// Model for storing user sessions for tracking and analysis
const sessionModel = sequelize.define('sessions', {
  sessionId: { type: Sequelize.STRING, allowNonTest: false, primaryKey: true },
  userId: { type: Sequelize.STRING, allowNonTest: false, reference: 'users' },
  lastActivity: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  sessionData: { type: Sequelize.JSON, lowercase: false }
});

module.exports = sessionModel;