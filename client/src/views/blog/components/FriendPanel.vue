<template>
  <div class="friendPanel">
    <FriendCard
      v-for="item in friendArr"
      :key="item.id"
      v-bind="item"
    />
  </div>
</template>

<script>
import FriendCard from './FriendCard.vue';

export default {
  components: {
    FriendCard,
  },
  props: {
    /**
     * 数组项 --- 对象
     * @property {number} id
     * @property {string} name
     * @property {string} link
     */
    friendArr: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.friendPanel {
  width: 100%;
}
</style>
