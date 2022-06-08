<template>
  <div class="message">
    <div class="messagePanel"></div>
  </div>
</template>

<script>
import Valine from 'valine';

export default {
  mounted() {
    // 初始化留言板
    const valine = new Valine();
    valine.init({
      el: '.messagePanel',
      appId: 'YVltSC5bOhmDMMM2F3fRL04z-gzGzoHsz',
      appKey: 'yxSzKDH2ky55QFm4jfGxbhX7',
      path: 'messagePanel',
    });
  },
};
</script>

<style scoped>
  .messagePanel {
    width: 860px;
    padding: 0 20px;
    margin: 30px auto;
  }
</style>
