const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Extra = sequelize.define('Extra', {
  role: { //默认值为：admin
    type: DataTypes.STRING,
    defaultValue: 'admin',
    allowNull: false,
    primaryKey: true
  },
  pageViews: { //浏览量
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: false,
});

module.exports = Extra;
