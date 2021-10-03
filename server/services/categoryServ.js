const Category = require('../models/Category');
const Blog = require('../models/Blog');
const { trimStrOfObj } = require('./util');

exports.addCategory = async function(categoryObj) {
  trimStrOfObj(categoryObj);
  const { categoryName } = categoryObj;
  const res = await Category.findOne({ where: { categoryName } });
  if(!res) { //若该categoryObj不存在，则添加该数据并将其返回
    const ins = await Category.create(categoryObj);
    return ins.toJSON();
  }
  return null; //若该categoryObj已存在，则返回null
}

exports.deleteCategory = async function(id) {
  const res = await Category.destroy({ where: { id } });
  return res;
}

exports.updateCategory = async function(id, categoryObj) {
  trimStrOfObj(categoryObj);
  const res = await Category.update(categoryObj, { where: { id } });
  return res;
}

exports.getCategoryById = async function(id) {
  const res = await Category.findByPk(id, {
    include: { model: Blog }
  });
  if(res) {
    return res.toJSON();
  }
  return null;
}

// 模糊匹配categoryName字段
exports.getCategoryByName = async function(categoryName) {
  const res = await Category.findOne({
    where: { 
      categoryName: { 
        [Op.like]: `%${categoryName}%` 
      } 
    },
    include: { model: Blog }
  });
  return res.toJSON();
}

exports.getCategories = async function() {
  const res = await Category.findAll({
    include: { model: Blog, attributes: ['id'] }
  });
  return JSON.parse(JSON.stringify(res));
}
