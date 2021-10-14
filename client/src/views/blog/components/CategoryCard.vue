<template>
  <div class="categoryCard" @click="clickHandle">
    <span class="name">{{ categoryName }}</span>
    <div class="num" :style="{ backgroundColor: numBgColor }">
      <span>{{ blogsNum }}</span>
    </div>
  </div>
</template>

<script>
import BASE from './base';

export default {
  props: {
    categoryName: { // 种类名称
      type: String,
      required: true,
    },
    blogsNum: { // 该种类对应的博客数量
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      numBgColorArr: BASE.BG_COLOR_ARR,
    };
  },
  computed: {
    numBgColor() {
      const randomIndex = Math.floor(Math.random() * this.numBgColorArr.length);
      return this.numBgColorArr[randomIndex];
    },
  },
  methods: {
    clickHandle() { // 点击卡片项触发自定义的click事件
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" scoped>
.categoryCard {
  height: 45px;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 6px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    font-size: 15px;
    color: #242424;
    margin-right: 6px;
  }
  .num {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    background-color: rgb(248, 178, 106);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 13px;
      font-weight: 500;
      color: #fff;
    }
  }

  &:hover {
    transform: scale(1.04);
    .name {
      color: #3eaf7c;
    }
  }
}
</style>
