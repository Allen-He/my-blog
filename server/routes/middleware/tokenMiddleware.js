const { pathToRegexp } = require("path-to-regexp");
const jwt = require('../util/jwt');
const { getErr } = require('../util/sendRes');

// 需要附带token的请求白名单
const needTokenApi = [ //method的值必须大写
  // admin相关
  {method: 'GET', path: '/api/admin/whoami'},
  // blog相关
  {method: 'POST', path: '/api/blogs'},
  {method: 'PUT', path: '/api/blogs/:id'},
  {method: 'DELETE', path: '/api/blogs/:id'},
  // ctegories相关
  {method: 'POST', path: '/api/categories'},
  {method: 'PUT', path: '/api/categories/:id'},
  {method: 'DELETE', path: '/api/categories/:id'},
  // tags相关
  {method: 'POST', path: '/api/tags'},
  {method: 'PUT', path: '/api/tags/:id'},
  {method: 'DELETE', path: '/api/tags/:id'},
  // friends相关
  {method: 'POST', path: '/api/friends'},
  {method: 'PUT', path: '/api/friends/:id'},
  {method: 'DELETE', path: '/api/friends/:id'},
]

module.exports = function(req, res, next) {
  const needToken = needTokenApi.some(api => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });
  if(!needToken) { //如果该请求不需要token，则直接交给后续中间件处理，不做额外处理
    next();
    return;
  }
  // 验证token
  const result = jwt.verify(req);
  if(result) {
    req.userId = result.id; //将合法的用户id存储在当前的req.userId中，方便后续使用
    next();
  }else {
    handleNoneToken(req, res, next);
  }
}

function handleNoneToken(req, res, next) {
  res.status(403).send(getErr(403, `You don't have a valid token to access the api.`));
}
