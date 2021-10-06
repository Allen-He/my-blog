<template>
  <header class="navBar">
    <a class="left" href="/">
      <img class="logo" src="@/assets/logo.png" alt="">
      <span class="siteName">而已的博客</span>
    </a>
    <div class="right">
      <div class="themeBox">
        <i class="iconfont">&#xeae9;</i>
      </div>
      <div class="searchBox">
        <i class="iconfont">&#xe8b9;</i>
        <input type="text" placeholder="标题 or 作者">
      </div>
      <NavItem title="主页" @click="$router.push({name: 'Index'})">
        <i class="iconfont">&#xe613;</i>
      </NavItem>
      <NavItem title="分类" @click="$router.push({name: 'Categories'})">
        <i class="iconfont">&#xe669;</i>
      </NavItem>
      <NavItem title="留言板" @click="$router.push({name: 'Message'})">
        <i class="iconfont">&#xe604;</i>
      </NavItem>
      <NavItem title="快速导航" :isDrop="true">
        <template v-slot:dropMenu>
          <ul class="dropMenu">
            <li>
              <a href="https://github.com/Allen-He" target="_blank">Github</a>
              <i class="iconfont">&#xe614;</i>
            </li>
            <li>
              <a href="https://blog.csdn.net/weixin_47516343" target="_blank">CSDN</a>
              <i class="iconfont">&#xe614;</i>
            </li>
            <li>
              <a href="https://juejin.cn/user/2410580264357357" target="_blank">掘金</a>
              <i class="iconfont">&#xe614;</i>
            </li>
          </ul>
        </template>
      </NavItem>
      <NavItem title="关于我" @click="$router.push({name: 'About'})">
        <i class="iconfont">&#xeca6;</i>
      </NavItem>
    </div>
  </header>
</template>

<script>
import NavItem from './NavItem.vue';

export default {
  components: {
    NavItem,
  },
  data() {
    return {
      websiteTitle: 'sdf',
    };
  },
};
</script>

<style lang="less" scoped>
.navBar{
  width: 100vw;
  min-width: 900px;
  height: 58px;
  padding: 0px 24px;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    .logo {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .siteName {
      font-size: 20px;
      font-weight: 600;
      color: #242424;
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .searchBox {
      width: 200px;
      height: 36px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border: 1px solid #eaecef;
        border-radius: 6px;
        padding: 0 8px 0 32px;
        font-size: 14px;
        outline: none;
        transition: border .3s;
        color: #4e6e8e;
        &:focus {
          border: 1px solid #3eaf7c;
        }
      }
      .iconfont {
        position: absolute;
        left: 8px;
        top: 50%;
        font-weight: bold;
        transform: translateY(-50%);
      }
    }
    .themeBox {
      color: #7f7f7f;
      cursor: pointer;
      margin-right: 24px;
      &:hover {
        color: #3eaf7c;
      }
    }
  }
}
</style>
