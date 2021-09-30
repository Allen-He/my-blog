require('./Admin');
require('./Blog');
require('./Category');
require('./Tag');
require('./Friend');
require('./relation'); //定义模型关系
const sequelize = require('./db');

sequelize.sync({ alter: true }).then(() => {
    console.log('所有模型均已同步成功');
});
