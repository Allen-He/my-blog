<template>
  <div
    class="tagCard"
    :class="{ active: isActive }"
    :style="{ backgroundColor: tagBgColor }"
    @click="clickHandle"
  >
    {{ tagName }}
  </div>
</template>

<script>
import BASE from './base';

export default {
  props: {
    tagName: {
      type: String,
      required: true,
    },
    isActive: { // 是否被选中
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagBgColorArr: BASE.BG_COLOR_ARR,
    };
  },
  computed: {
    tagBgColor() {
      const randomIndex = Math.floor(Math.random() * this.tagBgColorArr.length);
      return this.tagBgColorArr[randomIndex];
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
.tagCard {
  display: inline-block;
  box-sizing: border-box;
  height: 22px;
  margin: 4px 5px 10px;
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  line-height: 14px;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all .5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.04);
  }
  &.active {
    transform: scale(1.2);
  }
}
</style>
