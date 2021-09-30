const sequelize = require('./db');

// 用于描述Blogs和Tags的多对多关系
const Blogs_Tags = sequelize.define('Blogs_Tags', {}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
});

module.exports = Blogs_Tags;
