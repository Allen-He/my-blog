const express = require('express');
const router = express.Router();
const extraServ = require('../../services/extraServ');
const { asyncHandler } = require('../util/sendRes');
const { isBrowser } = require('../util/tools');

// 获取所有额外信息 & 每获取一次首页访问量+1
router.get('/', asyncHandler(async (req, res, next) => {
  if(isBrowser(req)) { //正常浏览时，访问量+1
    const { pageViews } = await extraServ.getExtraInfo();
    await extraServ.updatePageViews({ pageViews: pageViews + 1 });
  }
  const data = await extraServ.getExtraInfo();
  delete data.role; //过滤敏感字段‘role’
  return data;
}));

module.exports = router;
