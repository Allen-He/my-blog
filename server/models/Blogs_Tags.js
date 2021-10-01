const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Blog = require('./Blog');
const Tag = require('./Tag');

// 用于描述Blogs和Tags的多对多关系
const Blogs_Tags = sequelize.define('Blogs_Tags', {}, {
  createdAt: false,
  updatedAt: false,
});

module.exports = Blogs_Tags;
