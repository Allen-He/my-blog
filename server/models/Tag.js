const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Tag = sequelize.define('Tag', {
  tagName: { //标签名
    type: DataTypes.STRING(64),
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
});

module.exports = Tag;
