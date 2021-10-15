const express = require('express');
const router = express.Router();
const blogServ = require('../../services/blogServ');
const { asyncHandler } = require('../util/sendRes');

// 按照keyword（模糊匹配title和author）分页获取blog数据
// 参数默认值为：page = 1, limit = 10, keyword=''（非必须）
router.get('/', asyncHandler(async (req, res, next) => {
  const { page, limit, keyword } = req.query;
  const data = await blogServ.getBlogsByPagination(page, limit, keyword);
  return data;
}));

// 获取所有blog数据
router.get('/all', asyncHandler(async (req, res, next) => {
  const data = await blogServ.getBlogs();
  return data;
}));

// 查询单个blog（根据id）
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await blogServ.getBlogById(id);
  return data;
}));

// 添加单个blog（添加成功返回相关信息，未成功则返回null）
router.post('/', asyncHandler(async (req, res, next) => {
  const {
    title,
    from,
    author,
    content,
    CategoryId,
    Tags = [] //默认为空数组
  } = req.body;
  if(!title) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await blogServ.addBlog({
    title,
    from,
    author,
    content,
    views: 0,
    likes: 0,
    ctime: Date.now() + '',
    utime: Date.now() + '',
    CategoryId,
    Tags
  });
  return data;
}));

// 修改单个blog（修改成功返回1，失败返回0）
router.put('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.utime = Date.now() + ''; //更新utime字段
  const data = await blogServ.updateBlog(id, req.body);
  return data[0];
}));

// 删除单个blog（删除成功返回1，失败返回0）
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await blogServ.deleteBlog(id);
  return data;
}));

module.exports = router;
