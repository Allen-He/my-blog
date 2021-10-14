<template>
  <div class="categoryPanel" :class="{ inlineStyle: showInline }">
    <CategoryCard
      :class="{ marginRound: showInline }"
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
    /** 是否依次横列展示，默认为false，即：每个card独占一行且竖直排列 */
    showInline: {
      type: Boolean,
      default: false,
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
.inlineStyle {

  .marginRound {
    margin: 4px 8px 10px;
    float: left;
  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
