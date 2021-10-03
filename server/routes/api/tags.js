const express = require('express');
const router = express.Router();
const tagServ = require('../../services/tagServ');
const { asyncHandler } = require('../util/sendRes');

// 查询所有tags
router.get('/', asyncHandler(async (req, res, next) => {
  const data = await tagServ.getTags();
  return data;
}));

// 查询单个tag（根据id）
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await tagServ.getTagById(id);
  return data;
}));

// 添加单个tag（添加成功返回相关信息，未成功则返回null）
router.post('/', asyncHandler(async (req, res, next) => {
  const { tagName } = req.body;
  if(!tagName) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await tagServ.addTag({ tagName });
  return data;
}));

// 修改单个tag（修改成功返回1，失败返回0）
router.put('/', asyncHandler(async (req, res, next) => {
  const { id, tagObj = null } = req.body;
  if(!id || !tagObj || !tagObj.tagName) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await tagServ.updateTag(id, tagObj);
  return data;
}));

// 删除单个tag（删除成功返回1，失败返回0）
router.delete('/', asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if(!id) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await tagServ.deleteTag(id);
  return data;
}));

module.exports = router;
