<template>
  <footer class="footerBar">
    <InfoItem/>
    <InfoItem/>
    <InfoItem/>
    <InfoItem/>
    <InfoItem/>
  </footer>
</template>

<script>
import InfoItem from './InfoItem.vue';

export default {
  components: {
    InfoItem,
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
}
</style>
