const express = require('express');
const router = express.Router();
const friendServ = require('../../services/friendServ');
const { asyncHandler } = require('../util/sendRes');

// 查询所有friends
router.get('/', asyncHandler(async (req, res, next) => {
  const data = await friendServ.getFriends();
  return data;
}));

// 查询单个friend（根据id）
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await friendServ.getFriendById(id);
  return data;
}));

// 添加单个friend（添加成功返回相关信息，未成功则返回null）
router.post('/', asyncHandler(async (req, res, next) => {
  const { name, link, desc, iconLink } = req.body;
  if(!name || !link || !desc || !iconLink) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await friendServ.addFriend({ name, link, desc, iconLink });
  return data;
}));

// 修改单个friend（修改成功返回1，失败返回0）
router.put('/', asyncHandler(async (req, res, next) => {
  const { id, friendObj = null } = req.body;
  if(!id || !friendObj || !friendObj.name || !friendObj.link || !friendObj.desc || !friendObj.iconLink) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await friendServ.updateFriend(id, friendObj);
  return data;
}));

// 删除单个friend（删除成功返回1，失败返回0）
router.delete('/', asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if(!id) {
    throw new Error('未按接口文档传入参数');
  }
  const data = await friendServ.deleteFriend(id);
  return data;
}));

module.exports = router;
