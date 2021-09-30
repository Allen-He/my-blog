const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Admin = sequelize.define('Admin', {
    loginId: { //账号
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: { //密码
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: { //昵称
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    paranoid: true, // 从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间 
});

module.exports = Admin;
