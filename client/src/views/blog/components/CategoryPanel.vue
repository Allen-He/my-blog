<template>
  <div class="categoryPanel">
    <CategoryCard
      v-for="item in categoryArr"
      :key="item.id"
      :categoryName="item.categoryName"
      :blogsNum="item.blogsNum"
      @click="clickCategoryHandle(item.id)"
    />
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue';

export default {
  components: {
    CategoryCard,
  },
  props: {
    /**
     * 数组项 --- 对象
     * @property {number} id
     * @property {string} categoryName
     * @property {number} blogsNum
     */
    categoryArr: {
      type: Array,
      required: true,
    },
  },
  methods: {
    clickCategoryHandle(id) {
      this.$router.push({
        name: 'Categories',
        params: { id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.categoryPanel {
  width: 100%;
}
</style>
