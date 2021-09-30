const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Friend = sequelize.define('Friend', {
  name: { //友链名称
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  link: { //友链-URL
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: { //友链描述
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  iconLink: { //友链icon-URL
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
});

module.exports = Friend;
