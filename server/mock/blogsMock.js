const Mock = require('mockjs');
const Blog = require('../models/Blog');
const Blogs_Tags = require('../models/Blogs_Tags');
const categoryServ = require('../services/categoryServ');
const TagServ = require('../services/tagServ');

const resData = Mock.mock({
    "data|10": [{
        "id|+1": 1,
        "title": "@ctitle(1,8)",
        "from": "@boolean",
        "author": "@cname",
        "content": "@cparagraph(15, 20)",
        "views": "@integer(0, 1000)",
        "likes": "@integer(0, 1000)",
        "ctime": Date.now() + '',
        "utime": Date.now() + ''
    }]
}).data;

async function getRandomCategoryId() { //在已有的Category中随机选择CategoryId
  let categoryIdPool = await categoryServ.getCategories();
  categoryIdPool = categoryIdPool.map(ele => ele.id);
  return Mock.Random.integer(0, categoryIdPool.length - 1);
}

async function getRandomTags() { //在已有的Category中随机选择Tags
  let TagsPool = await TagServ.getTags();
  TagsPool = TagsPool.map(ele => ele.id).sort(() => Math.random() - 0.5); //打乱该数组
  const maxIndex = Mock.Random.integer(0, TagsPool.length - 1);
  return TagsPool.slice(0, maxIndex);
}

(async function () {
    // 将CategoryId注入resData中的各数据对象，再将resData批量写入数据库
    for (let i = 0; i < resData.length; i++) {
      const CategoryId = await getRandomCategoryId();
      resData[i].CategoryId = CategoryId;
    }
    await Blog.bulkCreate(resData);
    console.log('blogs: 数据添加成功！');

    // 更新多对多关系表blogs_tags
    let relationData = [];
    for (let i = 0; i < resData.length; i++) {
      const { id: BlogId } = resData[i];
      // 随机生成Tags（值为TagId的数组），用于生成多对多关系数据relationData
      const Tags = await getRandomTags();
      for (let j = 0; j < Tags.length; j++) {
        const TagId = Tags[j];
        relationData.push({ BlogId, TagId });
      }
    }
    console.log(relationData);
    await Blogs_Tags.bulkCreate(relationData);
    console.log('blogs_tags: 关系添加成功！');
})();
