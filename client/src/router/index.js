import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/blog/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'Index',
        alias: '/',
        component: () => import('../views/blog/pages/Index.vue'),
      },
      {
        path: 'categories/:id',
        name: 'Categories',
        component: () => import('../views/blog/pages/Categories.vue'),
      },
      {
        path: 'tags/:id',
        name: 'Tags',
        component: () => import('../views/blog/pages/Tags.vue'),
      },
      {
        path: 'blogs/:id',
        name: 'BlogsDetail',
        component: () => import('../views/blog/pages/BlogsDetail.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/blog/pages/About.vue'),
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('../views/blog/pages/Message.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/admin/Login.vue'),
  },
];

// 解决重复点击路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
