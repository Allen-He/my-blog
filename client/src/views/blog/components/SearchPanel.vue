<template>
  <ul class="searchPanel" v-if="titleArr">
    <template v-if="titleArr.length !== 0">
      <li
        class="searchItem"
        v-for="(item, i) in titleArr"
        :key="item.id"
        :class="{active: activeIndex === i}"
        @click="clickHandle(item.id)"
      >
        <span class="title" v-html="item.title"></span>
        <span class="author" v-html="item.author"></span>
      </li>
    </template>
    <template v-else>
      <li class="searchItem noRes">抱歉！你的关键词未找到......</li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    titleArr: {
      type: Array,
      required: true,
    },
    activeIndex: {
      Number,
      default: -1,
    }, // 用于配合父组件实现“按方向键选择”各项内容
  },
  methods: {
    clickHandle(id) {
      this.$emit('onClick', id);
    },
  },
};
</script>

<style lang="less" scoped>
.searchPanel {
  width: 160%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #cfd4db;
  background-color: #fff;
  position: absolute;
  top: 110%;
  left: 0;

  .searchItem {
    box-sizing: border-box;
    height: 32px;
    line-height: 20px;
    padding: 6px 9px;
    font-size: 14px;
    font-weight: 600;
    color: #242424;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.active, &:hover {
      color: #3eaf7c;
      background-color: #eaecef;
    }
    .title {
      flex: 0 1 auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .author {
      flex: 0 0 auto;
    }
  }
  .noRes {
    cursor: default;
    color: #3eaf7c;
    &:hover {
      background-color: #fff;
    }
  }
}
</style>
