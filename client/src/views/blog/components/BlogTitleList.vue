<template>
  <div class="BlogTitleList">
    <BlogTitleCard
      v-for="blog in blogsArr"
      :key="blog.id"
      v-bind="blog"
      @clickCard="clickCardHandle(blog.id)"
      @clickTag="clickTagHandle"
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
  },
  methods: {
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
