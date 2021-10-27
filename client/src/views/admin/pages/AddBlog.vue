<template>
  <div class="addBlog">
    <MarkdownEditor @submit="submitHandle" />
    <InfoModel
      :visible="modelVisible"
      @close="modelCloseHandle"
      :content="blogContent"
    />
  </div>
</template>

<script>
import MarkdownEditor from '../components/mdEdit/MarkdownEditor.vue';
import InfoModel from '../components/InfoModel.vue';

export default {
  components: {
    MarkdownEditor,
    InfoModel,
  },
  data() {
    return {
      modelVisible: false,
      blogContent: '',
    };
  },
  methods: {
    submitHandle(mdVal) {
      this.modelVisible = true;
      this.blogContent = mdVal;
    },
    modelCloseHandle() {
      this.modelVisible = false;
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
