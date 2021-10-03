// 用于“错误处理”的中间件
const { getErr } = require('../util/sendRes');

module.exports = function (err, req, res, next) {
  if(err) {
    const errMsg = err instanceof Error ? err.message : err;
    res.status(500).send(getErr(500, errMsg));
  }else {
    next(); 
  }
}
