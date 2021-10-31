<template>
  <div class="friendCard">
    <a class="box" :href="link" target="_blank">
      <span class="square" :style="{ backgroundColor: friendBgColor }"></span>
      <span class="linkName">{{ name }}</span>
    </a>
  </div>
</template>

<script>
import BASE from './base';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      friendBgColorArr: BASE.BG_COLOR_ARR,
    };
  },
  computed: {
    friendBgColor() {
      const randomIndex = Math.floor(Math.random() * this.friendBgColorArr.length);
      return this.friendBgColorArr[randomIndex];
    },
  },
};
</script>

<style lang="less" scoped>
.friendCard {
  display: inline-block;
  .box {
    display: inline-block;
    height: 28px;
    padding: 4px 8px 4px 20px;
    margin: 4px 4px 10px;
    background-color: #fff;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    font-size: 13px;
    line-height: 18px;
    color: #242424;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    .square {
      width: 6px;
      height: 6px;
      position: absolute;
      left: 7px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
