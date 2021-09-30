const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Blog = sequelize.define('Blog', {
  title: { //标题
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  from: { //来源：0-原创 or 1-转载
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  author: { //作者
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  content: { //内容
    type: DataTypes.TEXT,
    allowNull: false,
  },
  views: { //浏览量
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  likes: { //点赞量
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ctime: { //发布时间
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  utime: { //更新时间
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
});

module.exports = Blog;
