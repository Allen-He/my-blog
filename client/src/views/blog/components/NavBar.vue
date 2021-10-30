<template>
  <header class="navBar">
    <a class="left" href="/">
      <img @click="toAdminHandle" class="logo" src="@/assets/logo.png" alt="">
      <span class="siteName">{{ websiteTitle }}</span>
    </a>
    <div class="right">
      <div class="themeBox" @click="toggleDarkTheme">
        <i class="iconfont">&#xeae9;</i>
      </div>
      <div class="searchBox">
        <i class="iconfont">&#xe8b9;</i>
        <input
          type="text"
          placeholder="标题 or 作者"
          v-model.trim="searchVal"
          @input="searchBlogsHandle"
        >
        <SearchPanel
          v-if="showSearchPanel"
          :titleArr="titleArr"
          @onClick="searchItemClickHandle"
        />
      </div>
      <NavItem title="主页" iconCode="&#xe613;" @click="$router.push({name: 'Index'})" />
      <NavItem title="分类" iconCode="&#xe669;"
        @click="$router.push({name: 'Categories', params: { id: 'all' }})"
      />
      <NavItem title="留言板" iconCode="&#xe604;" @click="$router.push({name: 'Message'})" />
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
      <NavItem title="关于我" iconCode="&#xeca6;" @click="$router.push({name: 'About'})" />
    </div>
  </header>
</template>

<script>
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled,
} from 'darkreader';
import blogApi from '@/request/blogApi';
import NavItem from './NavItem.vue';
import SearchPanel from './SearchPanel.vue';

export default {
  components: {
    NavItem,
    SearchPanel,
  },
  data() {
    return {
      websiteTitle: '而已的博客',
      searchVal: '',
      titleArr: null,
      lastTime: 0, // 为搜索框的输入做“节流”处理
      rootNum: 0, // 记录“请求进入管理员界面”的次数
      lastRoot: 0, // 记录上一次“请求进入管理员界面”的时间
    };
  },
  computed: {
    showSearchPanel() {
      return this.titleArr;
    },
  },
  methods: {
    toggleDarkTheme() { // 切换黑暗主题
      if (isDarkReaderEnabled()) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    },
    async searchBlogsHandle() {
      const { searchVal, lastTime } = this;
      if (searchVal === '') { // 如果为空，则重置titleArr，且不做后续处理
        this.titleArr = null;
        return;
      }
      // 为搜索框的输入做“节流”处理
      const nowTime = Date.now();
      if (nowTime - lastTime > 300) {
        let resArr = await blogApi.searchByTitleOrAuthor(searchVal);
        resArr = resArr.map((item) => ({
          ...item,
          title: this.replaceTargetVal(item.title, searchVal),
          author: this.replaceTargetVal(item.author, searchVal),
        }));
        this.titleArr = resArr;
        this.lastTime = nowTime;
      }
    },
    /** 为originVal中的targetVal增添样式并返回 */
    replaceTargetVal(originVal, targetVal) {
      return originVal.replace(targetVal, `<span style="color: #3eaf7c">${targetVal}</span>`);
    },
    searchItemClickHandle() {
      this.titleArr = null; // 点击搜索结果项后，重置titleArr，以隐藏searchpanel面板
      this.searchVal = '';
    },
    toAdminHandle(e) {
      e.preventDefault();
      const nowTime = Date.now();
      if (nowTime - this.lastRoot < 500) { // 连续点击才有效（间隔为500毫秒，视为连续点击）
        this.rootNum += 1;
        if (this.rootNum === 3) {
          this.rootNum = 0; // 重置rootNum
          this.$router.push({ name: 'AdminHome' });
        }
      } else {
        this.rootNum = 0;
      }
      this.lastRoot = nowTime;
    },
  },
};
</script>

<style lang="less" scoped>
.navBar{
  width: 100%;
  min-width: 900px;
  height: 58px;
  padding: 0px 24px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

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
      color: #3eaf7c;
    }
  }
}
</style>
