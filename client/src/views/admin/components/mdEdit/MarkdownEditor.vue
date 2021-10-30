<template>
  <div class="markdownEditor" ref="markdownEditor" @fullscreenchange="screenchangeHandle">
    <div class="toolBar">
      <ul class="toolList">
        <a-popover @click="addFormat('bold')">
          <template slot="content"><p>加粗</p></template>
          <li><a-icon type="bold" /></li>
        </a-popover>
        <a-popover @click="addFormat('italic')">
          <template slot="content"><p>斜体</p></template>
          <li><a-icon type="italic" /></li>
        </a-popover>
        <a-popover @click="addFormat('deleteLine')">
          <template slot="content"><p>删除线</p></template>
          <li><a-icon type="strikethrough" /></li>
        </a-popover>
        <a-popover @click="addFormat('orderList', true)">
          <template slot="content"><p>有序列表</p></template>
          <li><a-icon type="ordered-list" /></li>
        </a-popover>
        <a-popover @click="addFormat('unorderList', true)">
          <template slot="content"><p>无序列表</p></template>
          <li><a-icon type="unordered-list" /></li>
        </a-popover>
        <a-popover @click="addFormat('code', true)">
          <template slot="content"><p>代码块</p></template>
          <li><a-icon type="code" /></li>
        </a-popover>
        <a-popover @click="addLink">
          <template slot="content"><p>超链接</p></template>
          <li><a-icon type="link" /></li>
        </a-popover>
        <a-popover @click="addExcel">
          <template slot="content"><p>表格</p></template>
          <li><a-icon type="file-excel" /></li>
        </a-popover>
        <a-popover @click="addPicture">
          <template slot="content"><p>图片(最多支持同时插入3个)</p></template>
          <li>
            <a-icon type="picture" />
            <input ref="inpPic" type="file" multiple v-show="false">
          </li>
        </a-popover>
        <a-popover>
          <template slot="content"><p>主题</p></template>
          <li><a-icon type="bg-colors" /></li>
        </a-popover>
        <a-popover>
          <template slot="content"><p>导入md</p><p>导出md</p></template>
          <li><a-icon type="dash" /></li>
        </a-popover>
      </ul>
      <ul class="btnList">
        <li @click="fullScreenHandle">{{ fullScreenText }}</li>
        <span>&nbsp;|&nbsp;</span>
        <li @click="submitHandle">提交</li>
      </ul>
    </div>
    <div class="editorBox">
      <textarea
        ref="edit"
        class="edit"
        v-model="mdVal"
        @input="parseHandle"
        @scroll="scrollHandle(1, $event)"
      ></textarea>
      <div
        ref="show"
        class="show"
        id="write"
        v-html="htmlVal"
        @scroll="scrollHandle(2, $event)"
      ></div>
    </div>
  </div>
</template>

<script>
import '@/assets/mdTheme/typora-lark.css';
import 'highlight.js/styles/github.css';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
import toolListMixin from './mixin/toolListMixin';

const md = markdownIt({
  // 设置代码高亮的配置
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs" language-${lang}">${hljs.highlight(lang, code, true).value}</code></pre>`;
      } catch (err) {
        // ...
      }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(code)}</code></pre>`;
  },
});

export default {
  mixins: [toolListMixin],
  data() {
    return {
      mdVal: '',
      htmlVal: '',
      whichScroll: 0, // 0: none; 1: 编辑区主动触发滚动; 2: 展示区主动触发滚动
      scrollTimer: null,
      isFullScreen: false, // 编辑器是否处于“全屏”状态
    };
  },
  computed: {
    fullScreenText() {
      return this.isFullScreen ? '退出全屏' : '全屏';
    },
  },
  methods: {
    parseHandle() {
      this.htmlVal = md.render(this.mdVal);
    },
    /** 使目标元素driveDom按照比例scale进行滚动 */
    driveScroll(scale, driveDom) {
      const eleDom = driveDom;
      const { scrollHeight, clientHeight } = eleDom;
      eleDom.scrollTop = (scrollHeight - clientHeight) * scale;

      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = null;
      }
      this.scrollTimer = setTimeout(() => {
        this.whichScroll = 0; // 在滚动结束后，将whichScroll设为0，表示滚动结束
        clearTimeout(this.scrollTimer);
      }, 200);
    },
    scrollHandle(idNum, e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const scale = scrollTop / (scrollHeight - clientHeight);

      if (idNum === 1) { // 主动触发scroll的区域为：编辑区
        if (this.whichScroll === 2) return;
        if (this.whichScroll === 0) this.whichScroll = 1;
        this.driveScroll(scale, this.$refs.show);
      } else if (idNum === 2) { // 主动触发scroll的区域为：展示区
        if (this.whichScroll === 1) return;
        if (this.whichScroll === 0) this.whichScroll = 2;
        this.driveScroll(scale, this.$refs.edit);
      }
    },
    // ------------------btnList: clickHandle------------------
    submitHandle() {
      // 若当前处于全屏模式，则先退出
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      // 点击提交按钮，触发submit事件，供父组件监听处理
      this.$emit('submit', this.mdVal);
    },
    fullScreenHandle() {
      if (this.isFullScreen) { // 退出全屏
        document.exitFullscreen();
      } else { // 进入全屏
        this.$refs.markdownEditor.requestFullscreen();
      }
    },
    screenchangeHandle() {
      if (document.fullscreenElement) { // 已经进入全屏模式
        this.isFullScreen = true;
      } else { // 已经退出全屏模式
        this.isFullScreen = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.markdownEditor{
  width: 100%;
  height: 100%;
  background-color: #fff;

  .toolBar {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      align-items: center;

      li {
        margin: 0 3px;
        cursor: pointer;
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        font-weight: bold;
        padding: 5px;
        user-select: none;

        &:hover {
          background-color: rgb(238, 238, 238);
        }
      }

      span {
        user-select: none;
      }
    }
    .toolList {
      justify-content: flex-start;
    }
    .btnList {
      justify-content: flex-end;
    }
  }

  .editorBox {
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    .edit {
      width: 50%;
      height: 100%;
      flex: 1 1 auto;
      box-sizing: border-box;
      padding: 20px 20px 40px;
      border: none;
      border-right: 2px solid rgb(238, 238, 238);
      background-color: rgb(248, 248, 250);
      font-size: 16px;
      outline: none;
      resize: none;
      overflow: auto;
    }
    .show {
      width: 50%;
      height: 100%;
      flex: 1 1 auto;
      box-sizing: border-box;
      padding: 20px 20px 40px !important;
      font-size: 15px;
      overflow: auto;
      position: relative;
      word-break: break-all;
    }
  }
}
</style>
