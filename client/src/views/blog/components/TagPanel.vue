<template>
  <div class="tagPanel">
    <TagCard tagName="All" @click="clickTagHandle('all')" :isActive="isActive('all')" />
    <TagCard
      v-for="item in tagArr"
      :key="item.id"
      :tagName="item.tagName"
      :isActive="isActive(item.id)"
      @click="clickTagHandle(item.id)"
    />
  </div>
</template>

<script>
import TagCard from './TagCard.vue';

export default {
  components: {
    TagCard,
  },
  props: {
    /**
     * 数组项 --- 对象
     * @property {number} id
     * @property {string} tagName
     * @property {number} blogsNum
     */
    tagArr: {
      type: Array,
      required: true,
    },
    existActive: { // 是否存在被选中的状态
      type: Boolean,
      default: false,
    },
    curActiveId: { // 当前状态为active的卡片的id（curActiveId需要和existActive配合使用，才能生效）
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    isActive(id) {
      return this.existActive && this.curActiveId === id;
    },
    clickTagHandle(id) {
      this.$router.push({
        name: 'Tags',
        params: { id },
      });
    },
  },
};
</script>

<style>
.tagPanel {
  width: 100%;
}
</style>
