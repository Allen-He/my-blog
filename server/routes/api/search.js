const express = require('express');
const router = express.Router();
const blogServ = require('../../services/blogServ');
const { asyncHandler } = require('../util/sendRes');

// 按照keyword（模糊匹配title和author）获取blog数据
router.get('/', asyncHandler(async (req, res, next) => {
  const { keyword } = req.query;
  const data = await blogServ.searchBlogByTitleOrAuthor(keyword);
  return data;
}));

module.exports = router;
