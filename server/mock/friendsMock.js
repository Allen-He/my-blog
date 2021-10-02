const Mock = require('mockjs');
const Friend = require('../models/Friend'); 

const resData = Mock.mock({
    "data|10": [{
        "id|+1": 1,
        "name": "@ctitle(3,6)",
        "link": "@url(http)",
        "desc": "@csentence(10, 20)",
        "iconLink": "@image('60x60')"
    }]
}).data;

(async function () {
    await Friend.bulkCreate(resData);
    console.log('friends: 数据添加成功！');
})();
