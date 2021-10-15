<template>
  <footer class="footerBar">
    <div class="item">
      <i class="iconfont">&#xe608;</i>
      <a href="https://vuepress-theme-reco.recoluan.com/" target="_blank">vuepress-theme-reco@1.6.6</a>
    </div>
    <div class="item">
      <i class="iconfont">&#xe7b7;</i>
      <a href="/" target="_blank">而已的博客</a>
    </div>
    <div class="item">
      <i class="iconfont">&#xe6b5;</i>
      <span>而已&nbsp;&nbsp;&nbsp;{{ rangeYear }}</span>
    </div>
    <div class="item">
      <i class="iconfont">&#xe648;</i>
      <span>99999</span>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      birthYear: 2021,
      nowYear: new Date().getFullYear(),
    };
  },
  computed: {
    rangeYear() {
      return `${this.birthYear}-${this.nowYear}`;
    },
  },
};
</script>

<style lang="less" scoped>
.footerBar {
  width: 100%;
  min-width: 900px;
  height: 68px;
  border-top: 1px solid #eaecef;
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    height: 20px;
    margin-left: 24px;
    display: flex;
    align-items: center;

    &:first-child {
      margin: 0;
    }

    .iconfont {
      font-size: 16px;
      color: #7F7F7F;
      margin-right: 8px;
    }
    a,
    span {
      font-size: 14px;
      font-weight: 500;
      color: #3eaf7c;
      vertical-align: middle;
    }
  }
}
</style>
