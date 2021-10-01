const { Op } = require('sequelize');
const Blog = require('../models/Blog');
const Tag = require('../models/Tag');
const Category = require('../models/Category');

exports.addBlog = async function(blogObj) {
  const { title, CategoryId, Tags } = blogObj;
  const res = await Blog.findOne({ where: { title } });
  if(!res) { //若该blogObj对应的名为title的数据不存在，则添加该数据并将其返回
    // 校验blogObj的属性CategoryId（可不传）
    if(CategoryId) {
      const catRes = await Category.findByPk(CategoryId);
      if(!catRes) {
        throw new Error('属性CategoryId的值不合法（不存在）');
      }
    }
    // 校验blogObj的属性Tags（可不传）
    if(Tags) {
      if(Array.isArray(Tags)) {
        let correctTags =  await Tag.findAll();
        correctTags = JSON.parse(JSON.stringify(correctTags)).map((item) => item.id);

        const incorrectTags = Tags.filter((ele) => !correctTags.includes(ele));
        if(incorrectTags.length !== 0) {
          throw new Error('属性Tags的值中，存在不合法的id（类型为number，对应的tag已存在）');
        }
        delete blogObj.Tags;
      }else {
        throw new Error('属性Tags的类型必须是：数组（各项的值为tag对应的id）')
      }
    }
    const ins = await Blog.create(blogObj);
    return ins.toJSON();
  }
  return null; //若该blogObj已存在，则返回null
}

exports.deleteBlog = async function(id) {
  const res = await Blog.destroy({ where: { id } });
  return res;
}

exports.updateBlog = async function(id, blogObj) {
  const res = await Blog.update(blogObj, { where: { id } });
  return res;
}

exports.getBlogById = async function(id) {
  const res = await Blog.findByPk(id, {
    include: {
      model: Tag,
      // attributes: ['id', 'tagName'],
    }
  });
  if(res) {
    return res.toJSON();
  }
  return null;
}

// 模糊匹配title字段
exports.getBlogByTitle = async function(title) {
  const res = await Blog.findAll({
    where: { 
      title: { 
        [Op.like]: `%${title}%` 
      } 
    }, 
    include: { model: Tag }
  });
  return JSON.parse(JSON.stringify(res));
}

exports.getBlogs = async function(id) {
  const res = await Blog.findAll({
    include: { model: Tag }
  });
  return JSON.parse(JSON.stringify(res));
}
