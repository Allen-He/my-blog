# my-blog 全栈个人博客网站（Vue + NodeJS ）

My first full-stack blog site. (Node.js + Vue)

## 项目背景

学习完NodeJS之后，准备独立开发一个全栈项目并部署上线，以达到“检验学习成果、丰富项目经验、提升自身开发能力”的目的。

## 项目介绍

### 后端

**一、技术栈**

1. 主要：NodeJS、MySQL、Sequelize、Express、CommonJS规范
2. 辅助：
   1. 开发依赖：nodemon
   2. 生产依赖：connect-history-api-fallback、cookie-parser、jsonwebtoken、md5、mockjs、mysql2、path-to-regexp

**二、整体架构**

> “三层架构思想”简述：
>
> 1. 路由层（Route）：提供对外的API访问接口
> 2. 服务层（Service）：提供业务逻辑的支持
> 3. 数据访问层（DAO）：提供与数据库或其他持久设备的通信，通常为ORM
>
> “Restful API”简述：（接口设计规范）
>
> 1. 看 URL 就知道要什么
> 2. 看 HTTP method 就知道干什么
> 3. 看 HTTP status code 就知道结果如何

参照“三层架构思想”，将后端划分为以下 5 个模块：

1. models层

   1. db模块：导入Sequelize，通过`new Sequelize(db, user, pwd, options)`的方式创建Sequelize连接（即：对象sequelize），并将其导出。
   2. 模型定义模块：通过`sequelize.define(modelName, options')`的方式定义Sequelize模型，并将其导出。每个模型都唯一对应一个数据表，数据表的名称为`modelName`的复数形式，数据表中的字段名以及字段对应的值的类型均可在`options`中定义。（会默认为每一个表创建一个名为`id`的自增字段作为“主键”）
   3. 若部分模型之间存在“一对多or多对一”、“多对多”等关系时，可单独创建一个 relation.js 文件，并在其中使用 `hasMany`、`belongsTo`、`belongsToMany`等方法进行声明。
   4. sync模块：导入上述所有模块，使用`sequelize.sync`方法同步所有模型（会在对应的MySQL数据库中初始化对应的数据表及其中的字段）

2. services层

   1. xxxServ模块：每个模型对应一个Serv模块，导入对应模型model，并利用`model.findOne`、`model.findByPK`、`model.findAll`、`model.findAndCountAll`、`model.create`、`model.destroy`、`model.update`等方法，导出一系列“增删改查”的方法。
   2. 具体使用使用方法，详见：项目源码 和 Sequelize官方文档

3. routes层

   1. index.js：导入express，通过`const app = express()`创建一个express实例，通过`app.use`方法使用相关“中间件”或“路由”，通过`app.listen`方法监听指定的端口，并开启服务器。
   2. util层：存放相关的工具模块用以导出相关的工具方法，如：sendRes.js（导出“处理后端返回结果”的方法）、jwt.js（导出“生成jwt验证jwt”的方法）。
   3. middleware层：errorMiddleware.js (“错误处理”的中间件) 、tokenMiddleware.js (“进行token校验”的中间件 - 内部维护有“需要附带token的请求"的白名单) 。
   4. api层：按照之前定义的模型，针对每个模型创建一个js模块，通过`const router = express.Router()`创建一个express路由。然后通过`router.get`、`router.post`等方法，配合services层定义的方法，根据“子路径”定义相关的接口，并导出该路由router。（index.js中，会通过`app.use(根路径，对应路由)`方法使用该路由）。

4. mock层

   1. 使用 MockJS ，配合services层导出的一系列方法，向MySQL数据库中批量注入一定规模的“假数据”用于后续的“前后端联调”。

5. public层

   1. 存放用户可通过网址访问的静态页面资源，后续会通过webpack自动将最新的前端代码打包到该目录下，供用户实时访问。

6. index.js：主入口文件，

   ```js
   require('./models/init');
   // require('./mock/init');
   require('./routes/index');
   ```

**三、重点功能**

1. **管理员登录：**使用JWT实现“后端侧”的登录流程，涉及库有：**jsonwebtoken**、**md5**、cookie-parser、... 
2. **文件上传：**待实现

### 前端

**一、技术栈**

1. 主要：Vue全家桶、Axios、Antdesign、Webpack、ES Module、Less、ESLint、markdown-it
2. 辅助：......

**二、整体架构**

1. assets目录：存储公用的静态资源，如图片、字体包、less文件、markdown主题样式文件等。
2. plugins目录： AntDesigin按需注册的文件
3. request目录：
   1. base目录：公共常量
   2. request.js：按需创建Axios实例，配置请求和响应拦截器，导出上述实例。
   3. xxxApi.js：导入request.js，按类别封装相关的“接口请求”方法并导出。
4. router目录：
   1. 创建并配置路由，使用导航守卫。

5. store目录：
   1. index.js：主文件，管理全局state
   2. loginUser.js： 管理module状态，与“管理员登录”相关，由index.js中使用modules选项进行合并。（避免主文件中内容太过复杂，使状态树看起来更加清晰，方便后期维护）

6. views目录：(整体结构 — 按照router中定义的路由层级进行划分)
   1. admin目录：(管理员操作界面)
      1. components
      2. pages
      3. AdminHome.vue
      4. Login.vue
   2. blog目录：（普通用户浏览界面）
      1. components
      2. pages
      3. Home.vue

**三、重点功能**

1. **管理员登录和注销：**使用JWT实现“前端侧”的登录流程，涉及：localStorage、Axios请求和响应拦截器、HTTP请求头和响应头、Vuex-modules、请求“whoAmI”接口（在网站被访问时，需要用token去换取用户的身份） 。
   - 修复服务端的bug-"/api/admin"相关接口返回数据时"对用户敏感信息进行过滤"的逻辑修正（使用浏览debug，查找错误）
2. **利用“路由元信息meta”、“localStorage”、“路由前置守卫beforeEach”实现“前端侧的访问鉴权”功能**
3. 将相似部分抽离成Vue组件加以使用，增加代码的复用性和可维护性。
4. 多个组件使用重复功能时，使用“混入Mixin”分发可复用的功能，降低代码重复度。**待实现**
5. **后端侧分页** & **前端侧分页**
6. 实现**“搜索关键词联想”**功能以及**“搜索结果中关键词高亮显示”**功能
7. 使用 markdown-it 库，实现一个简易的markdown编辑器，功能如下：
   1. 左侧编辑区书写内容，右侧展示区可同步预览效果（即：markdown语法解析，并实时渲染，代码块高亮展示）
   2. 两侧区域可实现同步滚动
   3. 编辑器工具栏的实现，功能如下
      1. 加粗、斜体、删除线、有序列表和无序列表、代码块、超链接、表格等。
      2. 插入图片 **即“文件上传”，待实现**
      3. markdown主题切换 **待实现**
      4. 导入和导出md文档 **待实现**
      5. 全屏视图—编辑
      6. 可自定义功能的“提交”按钮
8. 文件上传：**待实现**
9. 进度条、个性化滚动条：**待实现**
10. “前端侧”的“页面主题切换”功能（支持“暗黑模式”）：**待实现**
11. 留言板 和 文章评论：**待实现**
12. **文件上传：**待实现



## 问题 & 解决方法

1. “重复点击路由报错”的问题

   ```js
   const originalPush = VueRouter.prototype.push;
   VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch((err) => err);
   };
   ```

2. **“通过props动态传递 iconfont 编码至到组件内部，最终显示失效”的问题**

   - 解决方案：利用`v-html`解决

3. **实现“前端侧的访问鉴权”功能**

   1. 老旧方案 ① ：“路由元信息meta”、“vuex的state”、“路由前置守卫beforeEach”

      - 存在的问题：beforeEach被触发时，App.vue中的mounted钩子函数还没执行，即未请求whoami接口进行登录验证，故此时的userData始终为null。
      - 解决思路：经实践证明，beforeResolve守卫中的回调执行的时间介于 — App.vue的mounted 和 需要登录才能访问的xxx.vue的beforeCreated 之间。App.vue中的mounted钩子中会请求whoAmI接口并更新userData的值，所以beforeResolve被触发时，可以拿到最新的userData进行判断。

   2. 老旧方案 ② ：“路由元信息meta”、“vuex的state”、“路由解析守卫beforeResolve”

      - 存在的问题：beforeResolve晚于beforeEach，有点滞后性，不太理想。且偶尔还是会存在userData为null的时候，导致判断错误。

      - 解决思路：不使用“vuex的state”作为判断依据，而是用 localStorage

   3. 解决方案：利用“路由元信息**meta**”、**“localStorage”**、“路由前置守卫**beforeEach**”实现“前端侧的访问鉴权”功能。

4. **“管理员在成功添加文章后跳转到首页时，种类对应的文章数量等相关信息未自动刷新”的问题**

   - 解决方案：文章上传成功时，提交mutation以将相关的state重置为null，这样在进入其他页面之后，发现当前依赖的state为null则会重新发送请求更新相关数据。

5. **“通过scale实现元素hover状态时放大显示，其内部文字会出现闪动”的问题。**

   **待解决**



## 亮点 & 收获

2. 