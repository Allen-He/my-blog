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
      :pageSize="10"
      :total="blogsTotalNum"
      :hideOnSinglePage="true"
      @change="onChange"
    />
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
