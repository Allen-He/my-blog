<template>
  <div class="sectionTitle">
    <i class="iconfont" v-html="iconCode"></i>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    iconCode: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.sectionTitle {
  border-top: 1px solid #eaecef;
  padding: 20px 0;
  .iconfont {
    font-size: 15px;
    color: #7F7F7F;
    margin-right: 4px;
  }
  .title {
    font-size: 15px;
    font-weight: 500;
    color: #242424;
  }
}
</style>
