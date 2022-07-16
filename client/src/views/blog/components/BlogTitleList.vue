<template>
  <div class="BlogTitleList">
    <BlogTitleCard
      v-for="blog in blogsArr"
      :key="blog.id"
      v-bind="blog"
      @clickCard="clickCardHandle(blog.id)"
      @clickTag="clickTagHandle"
    />
    <a-pagination
      style="textAlign: center"
      show-quick-jumper
      :current="currentPage"
      :pageSize="pageSize"
      :total="blogsTotalNum"
      :hideOnSinglePage="true"
      @change="onChange"
    />
    <a-empty v-if="blogsArr.length === 0">
      <img slot="image" src="@/assets/imgs/empty.png" style="transform: scale(.6) translateY(30%)">
      <div slot="description">暂无文章数据</div>
    </a-empty>
  </div>
</template>

<script>
import BlogTitleCard from './BlogTitleCard.vue';

export default {
  components: {
    BlogTitleCard,
  },
  props: {
    blogsArr: {
      type: Array,
      required: true,
    },
    blogsTotalNum: {
      type: Number,
      require: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    onChange(page, pageSize) {
      this.currentPage = page;
      this.$emit('pageChange', { page, pageSize });
    },
    clickTagHandle(tagId) {
      this.$router.push({
        name: 'Tags',
        params: { id: tagId },
      });
    },
    clickCardHandle(blogId) {
      this.$router.push({
        name: 'BlogsDetail',
        params: { id: blogId },
      });
    },
  },
};
</script>

<style>

</style>
