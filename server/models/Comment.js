const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Comment = sequelize.define('Comment', {
  user: { //分类名称
    type: DataTypes.STRING(64),
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
});

module.exports = Comment;
