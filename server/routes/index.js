const express = require('express');
const path = require('path');
const app = express();
const staticRoot = path.resolve(__dirname, '../public');

// TODO: 使用该中间件后，后续的get类型的api请求的响应结果会有问题（待处理）
// 处理“单页应用history模式”的中间件
// const history = require('connect-history-api-fallback');
// app.use(history());

// 静态资源中间件（内置）
app.use(express.static(staticRoot));
// 解析“application/x-www-form-urlencoded”格式的请求体（内置）
app.use(express.urlencoded({ extended: true }));
// 解析“application/json”格式的请求体（内置）
app.use(express.json());

// "cors"中间件
const cors = require('cors');
app.use(cors()); //Enable All CORS Requests(除了带有身份凭证的请求)

// 使用cookie-parser中间件：后续中间件的req会新增cookies属性，res会新增cookie方法
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// "token处理"中间件
app.use(require('./middleware/tokenMiddleware'));

// api：使用express路由
app.use('/api/admin', require('./api/admin'));
app.use('/api/categories', require('./api/categories'));
app.use('/api/tags', require('./api/tags'));
app.use('/api/friends', require('./api/friends'));
app.use('/api/blogs', require('./api/blogs'));
app.use('/api/search', require('./api/search'));

// "错误处理"中间件
app.use(require('./middleware/errorMiddleware'));


const port = 999;
app.listen(port, () => {
  console.log(`server listens on port: ${port}`);
});
