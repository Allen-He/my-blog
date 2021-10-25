<template>
  <div class="adminHome">
    <h1>添加博客</h1>
    <span>用户名：{{ userData && userData.nickname }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('loginUser', ['userData']),
  },
};
</script>
