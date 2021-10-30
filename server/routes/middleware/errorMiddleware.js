// 用于“错误处理”的中间件
const multer = require('multer');
const { getErr } = require('../util/sendRes');

module.exports = function (err, req, res, next) {
  if(err) {
    if(err instanceof multer.MulterError) {
      res.status(200).send(getErr(403, err.message));
    }
    const errMsg = err instanceof Error ? err.message : err;
    res.status(200).send(getErr(500, errMsg));
  }else {
    next(); 
  }
}
