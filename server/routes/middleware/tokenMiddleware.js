const { pathToRegexp } = require("path-to-regexp");
const jwt = require('../util/jwt');
const { getErr } = require('../util/sendRes');

// TODO: 该名单待完善
const needTokenApi = [ //method的值必须大写
  {method: 'GET', path: '/api/admin/whoami'},
  // {method: 'POST', path: '/api/blogs'},
  // {method: 'PUT', path: '/api/blogs/:id'}
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
