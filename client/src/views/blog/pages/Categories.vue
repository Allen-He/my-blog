<template>
  <div class="categories">
    <div class="categoriesBox">
      <CategoryPanel
        v-if="categoryArr"
        :categoryArr="categoryArr"
        :showInline="true"
        :hoverBgChange="true"
        :existActive="true"
        :curActiveId="categoryId"
      />
    </div>
    <div class="blogsBox">
      <BlogTitleList
        v-if="curPageBlogs"
        :blogsArr="curPageBlogs"
        :blogsTotalNum="blogsTotalNum"
        :pageSize="pageSize"
        @pageChange="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import blogApi from '@/request/blogApi';
import CategoryPanel from '../components/CategoryPanel.vue';
import BlogTitleList from '../components/BlogTitleList.vue';

export default {
  components: {
    CategoryPanel,
    BlogTitleList,
  },
  data() {
    return {
      curBlogsArr: null,
      blogsTotalNum: 0,
      pageOffset: 0,
      pageSize: 5,
    };
  },
  computed: {
    ...mapState(['categoryArr']),
    categoryId() {
      return this.$route.params.id;
    },
    curPageBlogs() {
      // 用于在“前端侧”实现数据分页展示
      const start = this.pageOffset;
      const end = this.pageOffset + this.pageSize;
      return this.curBlogsArr?.slice(start, end);
    },
  },
  methods: {
    ...mapActions(['setCategoryArr']),
    async updateBlogsData() {
      try {
        let data = null;
        if (this.categoryId === 'all') { // 即：不限分类
          data = await blogApi.getBlogs();
        } else { // 即：限制分类
          data = await blogApi.getBlogsByCategoryId(this.categoryId);
        }
        this.curBlogsArr = data;
        this.blogsTotalNum = data.length;
      } catch (err) {
        console.error('数据获取失败：', err.toString());
      }
    },
    onPageChange({ page }) {
      // 切换页数的时候，更新当前的偏移量pageOffset
      this.pageOffset = (page - 1) * this.pageSize;
    },
  },
  created() {
    this.setCategoryArr();
  },
  watch: {
    categoryId: { // 即：监听动态路由参数的变化，并及时更新对应的blog数据
      handler() {
        this.updateBlogsData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.categories {
  width: 100%;
  min-width: 900px;
  padding: 30px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .categoriesBox {
    width: 860px;
    margin: 0 40px;
  }
  .blogsBox {
    width: 860px;
    margin: 15px 40px;
  }
}
</style>
