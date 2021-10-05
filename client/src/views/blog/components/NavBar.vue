<template>
  <header class="navBar">
    <a class="left" href="#">
      <img src="@/assets/logo.png" alt="">
      <span class="siteName">而已的博客</span>
    </a>
    <div class="right">
      <i class="iconfont">&#xeae9;</i>
    </div>
    <ul>
      <li>sdfsd</li>
      <li>dsfdsfa</li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      websiteTitle: 'sdf',
    };
  },
};
</script>

<style lang="less" scoped>
.navBar{
  width: 100vw;
  height: 58px;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
  }
}
</style>
