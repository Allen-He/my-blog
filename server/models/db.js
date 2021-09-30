const { Sequelize } = require('sequelize');

// 创建数据库连接
const sequelize = new Sequelize('myblogdb_website', 'root', '123123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
