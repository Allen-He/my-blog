exports.getRes = function (data) {
  return {
    code: 200,
    msg: 'OK',
    datas: data
  }
}

exports.getErr = function (errCode = 500, err = 'server internal error') {
  return {
    code: errCode,
    msg: err
  }
}

exports.asyncHandler = function (asyncFunc) {
  return async function (req, res, next) {
    try {
      const data = await asyncFunc(req, res, next);
      res.send(exports.getRes(data));
    } catch (err) {
      next(err);
    }
  }
}
