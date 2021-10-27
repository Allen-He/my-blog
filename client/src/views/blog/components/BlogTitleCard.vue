<template>
  <div class="blogTitleCard" @click="clickCardHandle">
    <h1 class="title">{{ title }}</h1>
    <ul class="info">
      <li class="author">
        <i class="iconfont">&#xeca6;</i>
        <span class="name">{{ author }}</span>
      </li>
      <li class="creatTime">
        <i class="iconfont">&#xe63b;</i>
        <span class="time">{{ localCTime }}</span>
      </li>
      <li class="tags" v-if="showTags">
        <i class="iconfont">&#xe605;</i>
        <span
          class="tag"
          v-for="tag in selectedTags"
          :key="tag.id"
          @click="clickTagHandle(tag.id, $event)"
        >{{ tag.tagName }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    from: { type: Boolean, required: true },
    author: { type: String, required: true },
    ctime: { type: String, required: true },
    // CategoryId: { type: Number, required: true },
    Tags: {
      /**
       * 数组项 --- 属性
       * @property {number} id
       * @property {string} tagName
       */
      type: Array,
      required: true,
    },
  },
  computed: {
    showTags() {
      return this.Tags && this.Tags.length !== 0;
    },
    selectedTags() { // 默认只展示前3个标签
      return this.Tags.slice(0, 3);
    },
    localCTime() {
      return new Date(+this.ctime).toLocaleString();
    },
  },
  methods: {
    clickCardHandle() {
      this.$emit('clickCard');
    },
    clickTagHandle(tagId, e) {
      e.stopPropagation();
      this.$emit('clickTag', tagId);
    },
  },
};
</script>

<style lang="less" scoped>
.blogTitleCard {
  width: 100%;
  min-height: 102px;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all .5s;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .title {
    display: inline-block;
    line-height: 45px;
    font-size: 20px;
    font-weight: 500;
    color: #242424;
    position: relative;
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 2px;
      background-color: #3eaf7c;
      transition: all .3s ease-in-out;
      transform: scaleX(0);
      position: absolute;
      bottom: 2px;
      left: 0;
    }

    &:hover {
      color: #3eaf7c;
      &::after {
        transform: scaleX(1);
      }
    }
  }
  .info {
    min-height: 25px;
    font-size: 16px;
    color: #7f7f7f;
    overflow: hidden;

    li {
      display: inline-block;
      line-height: 25px;
      margin-right: 16px;
      .iconfont {
        font-size: 16px;
        color: #7f7f7f;
        margin-right: 8px;
      }

      &.tags .tag {
        margin-right: 8px;
        &:hover {
          color: #3eaf7c;
        }
      }
    }
  }
}
</style>
