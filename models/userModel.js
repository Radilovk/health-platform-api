
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  goals: {
    type: DataTypes.JSON,
    allowNull: true,
  }
});

module.exports = User;
