<template>
  <div class="home">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail"> <a-icon type="mail" />Navigation One </a-menu-item>
      <a-menu-item key="app"> <a-icon type="appstore" />Navigation Two </a-menu-item>
      <a-menu-item key="alipay">....</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      current: ['mail'],
    };
  },
};
</script>
