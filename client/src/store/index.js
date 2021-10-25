import Vue from 'vue';
import Vuex from 'vuex';
import loginUser from './loginUser';
import blogApi from '../request/blogApi';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginUser,
  },
  state: {
    categoryArr: null, // 文章分类
    tagArr: null, // 文章标签
    friendArr: null, // 友链
  },
  mutations: {
    setCategoryArr(state, payload) {
      state.categoryArr = payload;
    },
    setTagArr(state, payload) {
      state.tagArr = payload;
    },
    setFriendArr(state, payload) {
      state.friendArr = payload;
    },
  },
  actions: {
    async setCategoryArr({ commit, state }) {
      if (state.categoryArr) return; // 当categoryArr为null时，才请求并更新该state数据
      const data = await blogApi.getCategories();
      const resArr = data.map((item) => ({
        id: item.id,
        categoryName: item.categoryName,
        blogsNum: item.Blogs.length,
      }));
      commit('setCategoryArr', resArr);
    },
    async setTagArr({ commit, state }) {
      if (state.tagArr) return; // 当tagArr为null时，才请求并更新该state数据
      const data = await blogApi.getTags();
      const resArr = data.map((item) => ({
        id: item.id,
        tagName: item.tagName,
        blogsNum: item.Blogs.length,
      }));
      commit('setTagArr', resArr);
    },
    async setFriendArr({ commit, state }) {
      if (state.friendArr) return; // 当friendArr为null时，才请求并更新该state数据
      const data = await blogApi.getFriends();
      const resArr = data.map((item) => ({
        id: item.id,
        name: item.name,
        link: item.link,
      }));
      commit('setFriendArr', resArr);
    },
  },
});
