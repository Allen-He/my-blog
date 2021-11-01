<template>
  <div class="blogsDetail" v-if="curBlog">
    <div class="blogInfo">
      <BlogTitleCard
        v-bind="curBlog"
        :showInBlogDetail="true"
        @clickTag="clickTagHandle"
      />
    </div>
    <div class="blogContainer" id="write" v-html="contentHtml"></div>
    <div class="extraInfo">
      <div class="lastUpdate">
        <span class="prefix">Last Updated: </span>
        <span class="time">{{ lastUpdateTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/mdTheme/typora-lark-green.css';
import 'highlight.js/styles/github-dark-dimmed.css';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
import blogApi from '@/request/blogApi';
import BlogTitleCard from '../components/BlogTitleCard.vue';

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
  components: {
    BlogTitleCard,
  },
  data() {
    return {
      curBlog: null,
    };
  },
  computed: {
    blogId() {
      return this.$route.params.id;
    },
    contentHtml() {
      const { content } = this.curBlog;
      // 将content解析为html格式的字符串
      return md.render(content);
    },
    lastUpdateTime() {
      const utime = new Date(+this.curBlog.utime).toLocaleString();
      return utime;
    },
  },
  methods: {
    async getCurBlog() {
      this.curBlog = await blogApi.getBlogById(this.blogId);
    },
    clickTagHandle(tagId) {
      this.$router.push({
        name: 'Tags',
        params: { id: tagId },
      });
    },
  },
  watch: {
    blogId: { // 即：监听动态路由参数的变化，并及时更新对应的blog数据
      handler() {
        this.getCurBlog();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.blogsDetail {
  width: 100%;
  min-width: 900px;
  padding: 30px 0 45px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .blogInfo {
    width: 860px;
    margin: 0 40px;
  }
  .blogContainer {
    width: 860px;
    margin: 15px 40px 0;
    padding: 0 20px !important;
  }
  .extraInfo {
    width: 860px;
    padding: 0 20px;
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .lastUpdate {
      font-size: 15px;
      font-weight: 400;
      color: #aaa;
      .prefix {
        font-weight: 500;
        color: #3eaf7c;
      }
    }
  }
}
</style>
