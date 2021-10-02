const Mock = require('mockjs');
const Tag = require('../models/Tag'); 

const resData = Mock.mock({
    "data|10": [{
        "id|+1": 1,
        "tagName": "@ctitle(2,5)"
    }]
}).data;

(async function () {
    await Tag.bulkCreate(resData);
    console.log('tags: 数据添加成功！');
})();
