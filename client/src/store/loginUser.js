import loginApi from '../request/loginApi';

export default {
  namespaced: true,
  state: {
    userData: null,
  },
  mutations: {
    /** 存储当前管理员的信息 */
    setUserData(state, payload) {
      state.userData = payload;
    },
  },
  actions: {
    async setUserData({ commit }, { loginId, loginPwd }) {
      const resp = await loginApi.login(loginId, loginPwd);
      commit('setUserData', resp);
      // 登录成功后，将接口返回的userData备份到localStorage中，用于后续路由跳转鉴权
      localStorage.setItem('userData', JSON.stringify(resp));
      return resp;
    },
    async whoAmI({ commit }) {
      try {
        const resp = await loginApi.whoAmI();
        commit('setUserData', resp);
      } catch (err) {
        commit('setUserData', null);
      }
    },
    async logout({ commit }) {
      commit('setUserData', null);
      // 退出登录后，将备份到localStorage的userData清空
      localStorage.removeItem('userData');
      await loginApi.logout();
    },
  },
};
