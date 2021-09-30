const sequelize = require('./db');
const Blog = require('./Blog');
const Category = require('./Category');
const Tag = require('./Tag');

// 定义Blog与Category的"关联关系"：多对一
Category.hasMany(Blog);
Blog.belongsTo(Category);

// 定义Blog与Tag的"关联关系"：多对多
const blogs_Tags = sequelize.define('blogs_Tags', {}, {
  createdAt: false,
  updatedAt: false,
});
Blog.belongsToMany(Tag, { through: blogs_Tags});
