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
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/blog/pages/Categories.vue'),
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('../views/blog/pages/Tags.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/blog/pages/About.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/admin/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
