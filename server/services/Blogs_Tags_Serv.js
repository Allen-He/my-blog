const Blog = require('../models/Blog');
const Tag = require('../models/Tag');
const Blogs_Tags = require('../models/Blogs_Tags');
const { trimStrOfObj } = require('./util');

exports.addRelation = async function(idObj) {
  trimStrOfObj(idObj);
  const { BlogId, TagId } = idObj;
  const res = await Blogs_Tags.findOne({ where: idObj });
  if(!res) { //若该idObj不存在，则添加该数据并将其返回
    let blogExist = await Blog.findByPk(BlogId);
    let tagExist = await Tag.findByPk(TagId);

    if(blogExist && tagExist) {
      const ins = await Blogs_Tags.create(idObj);
      return ins.toJSON();
    }else {
      throw blogExist ? new Error('tagId不合法') : new Error('blogId不合法');
    }
  }
  return null; //若该idObj已存在，则返回null
}

exports.deleteRelation = async function(BlogId, TagId) {
  const res = await Blogs_Tags.destroy({ where: { BlogId, TagId } });
  return res;
}

exports.getRelations = async function () {
  const res = await Blogs_Tags.findAll();
  return JSON.parse(JSON.stringify(res));
}

exports.getRelationsByBlogId = async function (BlogId) {
  const res = await Blogs_Tags.findAll({ where: { BlogId } });
  return JSON.parse(JSON.stringify(res));
}

exports.getRelationsByTagId = async function (TagId) {
  const res = await Blogs_Tags.findAll({ where: { TagId } });
  return JSON.parse(JSON.stringify(res));
}

