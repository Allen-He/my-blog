<template>
  <div class="home">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'Home',
  components: {
    NavBar,
  },
  data() {
    return {
      current: ['mail'],
    };
  },
};
</script>
