<template>
  <div class="addBlog">
    <MarkdownEditor @submit="submitHandle" />
  </div>
</template>

<script>
import MarkdownEditor from '../components/mdEdit/MarkdownEditor.vue';

export default {
  components: {
    MarkdownEditor,
  },
  methods: {
    submitHandle(e) {
      // TODO: 上传blog（弹出模态框，完善相关信息，再上传）
      console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
.addBlog {
  width: 100vw;
  height: calc(100vh - 47.6px);
}
</style>
