require('./models/init');
require('./mock/init');
require('./routes/index');

// const adminServ = require('./services/adminServ');
// adminServ.addAdmin({
//   loginId: '18308365449',
//   loginPwd: 'hcx147852369',
//   nickname: '继续努力就好'
// });
// adminServ.login('18308365449', 'hcx147852369').then(res => console.log(res));

// const blogServ = require('./services/blogServ');
// blogServ.getBlogsByPagination(1, 5, 'x').then(res => console.log(res));

// blogServ.addBlog({
//   title: 'NEW TEST 666',
//   from: 0,
//   author: 'Allen_He',
//   content: 'cssggdfasdfdsfdsvxxxfd',
//   views: 0,
//   likes: 0,
//   ctime: Date.now(),
//   utime: Date.now(),
//   CategoryId: 3,
//   Tags: [1, 2, 3]
// }).then(res => console.log(res));

// blogServ.updateBlog(4, {
//   from: 0,
// }).then(res => console.log(res));

// blogServ.getBlogByTitle('0').then(res => {
//   for (let i = 0; i < res.length; i++) {
//     console.log(res[i].Tags);
//   }
//   // console.log(res);
// });

// const tagServ = require('./services/tagServ');
// tagServ.getTags().then(res => {
//     console.log(res);
// });

// const catServ = require('./services/categoryServ');
// catServ.getCategories().then(res => {
//     console.log(res);
// });

// const adminServ = require('./services/adminServ');
// adminServ.addAdmin({
//   loginId: 'abc',
//   loginPwd: '123123',
//   nickname: '继续努力就好'
// }).then(res => console.log(res));

// const reServ = require('./services/Blogs_Tags_Serv');
// reServ.addRelation({
//   BlogId: 13,
//   TagId: 2
// }).then(res => console.log(res));
// reServ.deleteRelation(13, 2).then(res => console.log(res));
// reServ.getRelationsByTagId(1).then(res => console.log(res));
// reServ.getRelationsByBlogId(6).then(res => console.log(res));
