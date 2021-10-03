const JWT = require('jsonwebtoken');
// const secret = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
const secret = '0bxcu1nv42k01skd';
const cookieKey = 'my_blog_token';
const tokenHeader = 'authorization';

exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
  // 生成token
  const token = JWT.sign(info, secret, {
    expiresIn: maxAge,
  });
  // 设置响应头authorization
  res.header(tokenHeader, token);
  // TODO: 客户端若为浏览器，则可以通过cookie传输（但此处不做该处理，统一使用响应头传输）
}

exports.verify = function (req) {
  let token = req.cookies[cookieKey]; //先从请求头的cookie中获取，获取失败后再从请求头的authorization字段中获取
  if(!token) {
    token = req.headers[tokenHeader];
    if(!token) { //请求头中没有此token，返回null
      return null;
    }
    // 请求头字段格式 authorization: bearer token
    token = token.split(' ');
    token = token.length === 1 ? token[0] : token[1];
  }
  // 开始验证token（验证通过则返回解密后的res，反之则返回null）
  try {
    const res = JWT.verify(token, secret);
    return res;
  } catch (err) {
    return null;
  }
}
