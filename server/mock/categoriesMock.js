const Mock = require('mockjs');
const Category = require('../models/Category'); 

const resData = Mock.mock({
    "data|10": [{
        "id|+1": 1,
        "categoryName": "@ctitle(2,3)"
    }]
}).data;

(async function () {
    await Category.bulkCreate(resData);
    console.log('categories: 数据添加成功！');
})();
