// Session Model for storing user session and activity data for analytics
db.define('Session', {
  userId: { type: DataTypes.INTEGER, allowNULL: false },
  sessionId: { type: DataTypes.STRING, primaryKey: true, allowNULL: false },
  actionType: { type: DataTypes.STRING, allowNULL: true },
  dateTime: { type: DataTypes.DATE, defaultValue: Date.now },
}, {
  tableName: 'sessions'
});

module.exports = session;
