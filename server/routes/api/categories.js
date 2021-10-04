const express = require('express');
const router = express.Router();
const categoryServ = require('../../services/categoryServ');
const { asyncHandler } = require('../util/sendRes');

// 查询所有categories
router.get('/', asyncHandler(async (req, res, next) => {
  const data = await categoryServ.getCategories();
  return data;
}));

// 查询单个category（根据id）
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await categoryServ.getCategoryById(id);
  return data;
}));

// 添加单个category（添加成功返回相关信息，未成功则返回null）
router.post('/', asyncHandler(async (req, res, next) => {
  const { categoryName } = req.body;
  if(!categoryName) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await categoryServ.addCategory({ categoryName });
  return data;
}));

// 修改单个category（修改成功返回1，失败返回0）
router.put('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await categoryServ.updateCategory(id, req.body);
  return data[0];
}));

// 删除单个category（删除成功返回1，失败返回0）
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await categoryServ.deleteCategory(id);
  return data;
}));

module.exports = router;
