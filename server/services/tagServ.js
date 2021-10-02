const Tag = require('../models/Tag');
const Blog = require('../models/Blog');

exports.addTag = async function(tagObj) {
  const { TagName } = tagObj;
  const res = await Tag.findOne({ where: { TagName } });
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
  const res = await Tag.update(tagObj, { where: { id } });
}

exports.getTagById = async function(id) {
  const res = await Tag.findByPk(id, {
    include: { model: Blog }
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
    include: { model: Blog }
  });
  return JSON.parse(JSON.stringify(res));
}
