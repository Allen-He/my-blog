<template>
  <div class="infoModel">
    <a-modal
      title="上传文章"
      cancelText="重置"
      okText="提交"
      :width="400"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="blogInfoForm"
        :model="blogInfoForm"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-model-item ref="title" label="标题" prop="title">
          <a-input
            class="inputBox"
            v-model.trim="blogInfoForm.title"
            @blur="() => { $refs.title.onFieldBlur(); }"
          />
        </a-form-model-item>
        <a-form-model-item ref="author" label="作者" prop="author">
          <a-input
            class="inputBox"
            v-model.trim="blogInfoForm.author"
            @blur="() => { $refs.author.onFieldBlur(); }"
          />
        </a-form-model-item>
        <a-form-model-item label="来源" prop="from">
          <a-radio-group v-model="blogInfoForm.from">
            <a-radio :value="1">原创</a-radio>
            <a-radio :value="0">转载</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="种类" prop="categoryId">
          <a-select
            v-model="blogInfoForm.categoryId"
            style="width: 100%"
            placeholder="请选择文章的种类"
            option-label-prop="label"
          >
            <a-select-option
              v-for="item in categoryArr"
              :key="item.id"
              :value="item.id"
              :label="item.categoryName"
            >
              {{ item.categoryName }}
              <span style="color: #3370ff"> {{ item.blogsNum }} </span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="标签" prop="tags">
          <a-select
            v-model="blogInfoForm.tags"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择文章的标签"
            option-label-prop="label"
          >
            <a-select-option
              v-for="tag in tagArr"
              :key="tag.id"
              :value="tag.id"
              :label="tag.tagName"
            >
              {{ tag.tagName }}
              <span style="color: #3370ff"> {{ tag.blogsNum }} </span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import adminApi from '@/request/adminApi';

export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    content: { // 文章内容-md字符串（必传）
      type: String,
      require: true,
    },
  },
  data() {
    return {
      confirmLoading: false, // 是否正在提交
      blogInfoForm: {
        title: '',
        author: '继续努力就好',
        from: 1, // 1: 原创 | 0: 转载
        categoryId: [],
        tags: [],
      },
      rules: {
        title: [
          { required: true, message: '请输入文章的 标题', trigger: 'blur' },
          { min: 3, message: '长度必须大于3位', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '请输入文章的 作者', trigger: 'blur' },
          { min: 3, message: '长度必须大于3位', trigger: 'blur' },
        ],
        from: [
          { required: true, message: '请选择文章的 来源', trigger: 'blur' },
        ],
        categoryId: [
          { required: true, message: '请选择文章的 种类', trigger: 'blur' },
        ],
        tags: [
          { required: true, message: '请选择文章的 标签', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState(['categoryArr', 'tagArr']),
  },
  methods: {
    ...mapActions(['setCategoryArr', 'setTagArr']),
    async submitHandle() {
      const {
        title, from, author, categoryId, tags,
      } = this.blogInfoForm;

      const content = this.content.trim();
      if (content !== '') {
        try {
          this.confirmLoading = true; // 状态改为：正在提交
          const res = await adminApi.addBlog(title, from, author, content, categoryId, tags);
          if (res) { // 如果文章添加成功，跳转到博客首页
            this.$emit('close'); // 提交成功，触发close事件
            this.$router.push('/');
          }
        } catch (err) {
          // TODO: 提示框 待开发
          console.error(`添加失败！请尝试更换现有文章标题（《${title}》）后再提交！`);
        }
        this.confirmLoading = false; // 状态改为：正在提交
      } else {
        // TODO: 提示框 待开发
        console.error('文章内容不能为空');
      }
    },
    async handleOk() {
      const This = this; // 暂存当前Vue实例
      this.$refs.blogInfoForm.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        await This.submitHandle();
        return true;
      });
    },
    handleCancel(e) {
      if (e.target.nodeName === 'BUTTON') { // 重置按钮
        this.$refs.blogInfoForm.resetFields();
      } else { // 关闭图标
        this.$emit('close');
      }
    },
  },
  created() {
    this.setCategoryArr();
    this.setTagArr();
  },
};
</script>

<style lang="less" scoped>
.infoModel {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
