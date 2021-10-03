// 登录原理-方案选择
// 1. cookie
// 2. session
// 3. JWT(Json Web Token) √√√
const express = require('express');
const router = express.Router();
const adminServ = require('../../services/adminServ');
const jwt = require('../util/jwt');
const { asyncHandler } = require('../util/sendRes');

router.post('/login', asyncHandler(async (req, res, next) => {
  const { loginId, loginPwd } = req.body;
  const data = await adminServ.login(loginId, loginPwd);
  if(data) { //登陆成功，发布token（包含当前admin对应的id）
    const idVal = data.id;
    jwt.publish(res, undefined, { id: idVal });
  }
  // 过滤敏感数据（密码）再返回
  delete data.loginPwd;
  return data;
}));

router.get('/whoami', asyncHandler(async (req, res, next) => {
  const data = await adminServ.getAdminById(req.userId); //req.userId是由tokenMiddleware添加的属性，即：当前登录用户对应的id
  // 过滤敏感数据（密码）再返回
  delete data.loginPwd;
  return data;
}));

module.exports = router;
