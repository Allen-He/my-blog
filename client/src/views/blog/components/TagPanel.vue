<template>
  <div class="tagPanel">
    <TagCard tagName="All" @click="clickTagHandle('all')" />
    <TagCard
      v-for="item in tagArr"
      :key="item.id"
      :tagName="item.tagName"
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
  },
  methods: {
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
