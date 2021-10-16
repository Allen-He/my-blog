<template>
  <div class="categoryPanel" :class="{ inlineStyle: showInline }">
    <CategoryCard
      :class="{ marginRound: showInline }"
      v-for="item in categoryArr"
      :key="item.id"
      :categoryName="item.categoryName"
      :blogsNum="item.blogsNum"
      :hoverBgChange="hoverBgChange"
      :isActive="isActive(item.id)"
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
    hoverBgChange: { // 是否改变hover时的动效
      type: Boolean,
      default: false,
    },
    existActive: { // 是否存在被选中的状态
      type: Boolean,
      default: false,
    },
    curActiveId: { // 当前状态为active的卡片的id（curActiveId需要和existActive配合使用，才能生效）
      type: Number,
      default: null,
    },
  },
  methods: {
    isActive(id) {
      return this.existActive && this.curActiveId === id;
    },
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
