<template>
  <div class="navItem" @click="$emit('click')">
    <div class="itemWrap">
      <i class="iconfont" v-html="iconCode"></i>
      <div class="title">{{ title }}</div>
      <i v-if="isDrop" class="iconfont arrow">&#xe60a;</i>
    </div>

    <!-- 下拉菜单（插槽模板：详见下方注释） -->
    <slot name="dropMenu"></slot>
    <!-- <ul class="dropMenu">
      <li>
        <a href="https://github.com/Lpyexplore">Github</a>
        <i class="iconfont">&#xe63e;</i>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    iconCode: {
      type: String,
      default: '',
    },
    isDrop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.navItem {
  height: 30px;
  margin-left: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  .itemWrap {
    display: flex;
    .title {
      font-size: 14px;
      color: #242424;
      &:nth-child(2) {
        margin-left: 6px;
      }
    }
    .iconfont {
      font-size: 14px;
      color: #7f7f7f;
      &.arrow {
        margin-left: 6px;
        transform: scale(0.7);
      }
    }
    &:hover {
      .title,
      .iconfont {
        color: #3eaf7c;
      }
      .arrow {
        color: #7f7f7f;
      }
    }
  }

  .dropMenu {
    min-width: 80px;
    padding: 6px 12px;
    background-color: #fff;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    font-size: 13px;
    position: absolute;
    right: 0;
    top: 100%;
    display: none;

    li {
      height: 18px;
      line-height: 18px;
      cursor: pointer;
      &:not(:nth-child(1)) {
        margin-top: 6px;
      }
      &:hover {
        transform: scale(1.05);
        transition: scale .3s;
        a {
          color: #3eaf7c;
        }
      }

      a {
        color: #242424;
      }
      .iconfont {
        font-size: 13px;
        margin-left: 3px;
      }
    }
  }

  &:hover {
    .dropMenu {
      display: block;
    }
  }
}
</style>
