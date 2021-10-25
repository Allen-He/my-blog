<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    // 在网站被访问时，需要用token去换取用户的身份
    this.$store.dispatch('loginUser/whoAmI');
  },
};
</script>
