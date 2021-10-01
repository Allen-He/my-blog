const sequelize = require('./db');
const Blog = require('./Blog');
const Category = require('./Category');
const Tag = require('./Tag');
const Blogs_Tags = require('./Blogs_Tags');

// 定义Blog与Category的"关联关系"：多对一
Category.hasMany(Blog);
Blog.belongsTo(Category);

// 定义Blog与Tag的"关联关系"：多对多
Blog.belongsToMany(Tag, { through: Blogs_Tags });
Tag.belongsToMany(Blog, { through: Blogs_Tags });
