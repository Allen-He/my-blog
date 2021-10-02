// 用于“错误处理”的中间件
module.exports = function (err, req, res, next) {
  if(err) {
    const errObj = {
      status: 500,
      msg: err instanceof Error ? err.message : err,
    };
    res.status(500).send(errObj);
  }else {
    next(); 
  }
}
