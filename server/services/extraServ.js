const Extra = require('../models/Extra');

const ROLE_VAL = 'admin';

exports.getExtraInfo = async function () {
  const res = await Extra.findByPk(ROLE_VAL);
  return res;
}

exports.updatePageViews = async function({ pageViews }) {
  const res = await Extra.update({ pageViews }, { where: { role: ROLE_VAL } });
  return res;
}
