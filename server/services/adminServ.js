const md5 = require('md5');
const Admin = require('../models/Admin');
const { trimStrOfObj } = require('./util');

exports.addAdmin = async function (adminObj) {
  trimStrOfObj(adminObj);
  const { loginId, loginPwd } = adminObj;
  const res = await Admin.findOne({ where: { loginId } });
  if(!res) { //若该adminObj不存在，则添加该数据并将其返回
    adminObj.loginPwd = md5(loginPwd); //对loginPwd进行md5加密之后，再进行添加操作
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
  }
  return null; //若该adminObj已存在，则返回null
}

exports.deleteAdmin = async function (id) {
  const res = await Admin.destroy({ where: { id } });
  return res; //返回受影响的行数
}

exports.updateAdmin = async function (id, adminObj) {
  trimStrOfObj(adminObj);
  const res = await Admin.update(adminObj, { where: { id } });
  return res; //返回受影响的行数
}

// 登录查询
exports.login = async function (loginId, loginPwd) {
  loginPwd = md5(loginPwd); //对loginPwd进行md5加密之后，再查询
  const res = await Admin.findOne({
      where: {
          loginId,
          loginPwd
      }
  });
  // 由于sql语句不区分大小写，所以此处采用JS对loginId和loginPwd进一步校验
  if (res && res.loginId === loginId && res.loginPwd === loginPwd) {
      return res.toJSON();
  }
  return null;
}

// 按照主键查询
exports.getAdminById = async function (id) {
  const res = await Admin.findByPk(id);
  if (res) {
    return res.toJSON();
  }
  return null;
}

// 查询所有管理员信息
exports.getAdmins = async function () {
  const res = await Admin.findAll();
  return JSON.parse(JSON.stringify(res));
}
