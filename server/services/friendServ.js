const Friend = require('../models/Friend');

exports.addFriend = async function(friendObj) {
  const { name } = friendObj;
  const res = await Friend.findOne({ where: { name } });
  if(!res) { //若该friendObj不存在，则添加该数据并将其返回
    const ins = await Friend.create(friendObj);
    return ins.toJSON();
  }
  return null; //若该friendObj已存在，则返回null
}

exports.deleteFriend = async function(id) {
  const res = await Friend.destroy({ where: { id } });
  return res;
}

exports.updateFriend = async function(id, friendObj) {
  const res = await Friend.update(friendObj, { where: { id } });
}

exports.getFriendById = async function(id) {
  const res = await Friend.findByPk(id);
  if(res) {
    return res.toJSON();
  }
  return null;
}

exports.getFriendByName = async function(name) {
  const res = await Category.findOne({ where: { name } });
  return res.toJSON();
}

exports.getFriends = async function(id) {
  const res = await Friend.findAll();
  return JSON.parse(JSON.stringify(res));
}
