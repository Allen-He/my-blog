<template>
  <div class='adminHome'>
    <header class='header'>
      <a-menu v-model='current' mode='horizontal' class="navBar">
        <a-menu-item key='add'>
          <router-link :to="{ name: 'AddBlog' }">
            <a-icon type="cloud-upload" />
            <span>新增</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key='edit'>
          <router-link :to="{ name: 'UpdateBlog' }">
            <a-icon type="edit" />
            <span>编辑</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key='user' class="userBox">
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="user"/>
            <span>管理员：{{ userData && userData.nickname }}</span>
          </span>
          <a-menu-item key="setting:1" @click="logoutHandle">
            注销（Logout）
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      current: ['add'],
    };
  },
  computed: {
    ...mapState('loginUser', ['userData']),
  },
  methods: {
    ...mapActions('loginUser', ['logout']),
    async logoutHandle() {
      await this.logout(); // 退出登录后，返回登录页
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang='less' scoped>
.adminHome {
  .header {
    .navBar {
      padding: 0 15px;
      .userBox {
        float: right;
      }
    }
  }
}
</style>
