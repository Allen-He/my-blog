const Tag = require('../models/Tag');
const Blog = require('../models/Blog');
const { trimStrOfObj } = require('./util');

exports.addTag = async function(tagObj) {
  trimStrOfObj(tagObj);
  const { tagName } = tagObj;
  const res = await Tag.findOne({ where: { tagName } });
  if(!res) { //若该tagObj不存在，则添加该数据并将其返回
    const ins = await Tag.create(tagObj);
    return ins.toJSON();
  }
  return null; //若该tagObj已存在，则返回null
}

exports.deleteTag = async function(id) {
  const res = await Tag.destroy({ where: { id } });
  return res;
}

exports.updateTag = async function(id, tagObj) {
  trimStrOfObj(tagObj);
  const res = await Tag.update(tagObj, { where: { id } });
  return res;
}

exports.getTagById = async function(id) {
  const res = await Tag.findByPk(id, {
    include: { model: Blog, attributes: ['id', 'title', 'from', 'author', 'views', 'likes', 'ctime', 'utime', 'CategoryId'] }
  });
  if(res) {
    return res.toJSON();
  }
  return null;
}

// 模糊匹配tagName字段
exports.getTagByName = async function(tagName) {
  const res = await Tag.findOne({
    where: {
      tagName: {
        [Op.like]: `%${tagName}%` 
      }
    },
    include: { model: Blog }
  });
  return res.toJSON();
}

exports.getTags = async function() {
  const res = await Tag.findAll({
    include: { model: Blog, attributes: ['id'] }
  });
  return JSON.parse(JSON.stringify(res));
}
