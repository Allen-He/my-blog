<template>
  <div class="index">
    <div class="bigImg">
      <div class="descBox">
        <h1 class="desc">前端进阶之路</h1>
        <div class="descEn">Advanced road for FE</div>
      </div>
    </div>
    <div class="contentBox">
      <div class="content">
        <div class="blogBox">
          <BlogTitleList
            v-if="curBlogsArr"
            :blogsArr="curBlogsArr"
            :blogsTotalNum="blogsTotalNum"
            @pageChange="onPageChange"
          />
        </div>
        <div class="infoBox">
          <div class="info">
            <img class="avator" src="@/assets/imgs/logo.png" alt="" />
            <h3 class="name">而已</h3>
            <div class="nums">
              <div class="numsItem">
                <span class="num">{{ blogsNum }}</span>
                <span class="text">Article</span>
              </div>
              <div class="split"></div>
              <div class="numsItem">
                <span class="num">{{ tagsNum }}</span>
                <span class="text">Tag</span>
              </div>
            </div>
          </div>
          <div class="categoriesBox">
            <SectionTitle title="Categories" iconCode="&#xe669;" />
            <CategoryPanel v-if="categoryArr" :categoryArr="categoryArr" />
          </div>
          <div class="tagsBox">
            <SectionTitle title="Tags" iconCode="&#xe605;" />
            <TagPanel v-if="tagArr" :tagArr="tagArr" />
          </div>
          <div class="friendsBox">
            <SectionTitle title="Friendly Links" iconCode="&#xe63e;" />
            <FriendPanel v-if="friendArr" :friendArr="friendArr" />
          </div>
        </div>
      </div>
    </div>
    <FooterBar/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import blogApi from '@/request/blogApi';
import SectionTitle from '../components/SectionTitle.vue';
import BlogTitleList from '../components/BlogTitleList.vue';
import CategoryPanel from '../components/CategoryPanel.vue';
import TagPanel from '../components/TagPanel.vue';
import FriendPanel from '../components/FriendPanel.vue';
import FooterBar from '../components/FooterBar.vue';

export default {
  components: {
    SectionTitle,
    BlogTitleList,
    CategoryPanel,
    TagPanel,
    FriendPanel,
    FooterBar,
  },
  data() {
    return {
      curBlogsArr: null,
      blogsTotalNum: 0,
    };
  },
  computed: {
    ...mapState(['categoryArr', 'tagArr', 'friendArr']),
    tagsNum() {
      return this.tagArr ? this.tagArr.length : 0;
    },
    blogsNum() {
      return this.blogsTotalNum;
    },
  },
  methods: {
    ...mapActions(['setCategoryArr', 'setTagArr', 'setFriendArr']),
    onPageChange({ page }) {
      this.getBlogsAndTotal(page);
    },
    async getBlogsAndTotal(page) {
      const data = await blogApi.getBlogsByPagination(page);
      this.curBlogsArr = data.datas;
      this.blogsTotalNum = data.total;
    },
  },
  created() {
    this.setCategoryArr();
    this.setTagArr();
    this.setFriendArr();
    this.getBlogsAndTotal();
  },
};
</script>

<style lang="less" scoped>
.index {
  .bigImg {
    width: 100%;
    min-width: 900px;
    height: 450px;
    background: url(~@/assets/imgs/home.bg.svg) center center no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .descBox {
      text-align: center;
      .desc {
        font-size: 38px;
        font-weight: 500;
        margin-bottom: 24px;
      }
      .descEn {
        font-size: 30px;
      }
    }
  }
  .contentBox {
    width: 100%;
    min-width: 900px;
    padding: 20px 0 64px;
    display: flex;
    justify-content: center;

    .content {
      max-width: 1125px;
      min-width: 855px;
      margin: 0 20px;
      display: flex;
      justify-content: center;
      .infoBox {
        flex: 0 0 auto;
        width: 300px;
        padding: 30px 15px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
        margin-left: 15px;
        transition: all .3s;

        &:hover {
          box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .info {
          width: 100%;
          padding: 2px 0 35px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .avator {
            width: 96px;
            height: 96px;
            border-radius: 50%;
          }
          .name {
            margin: 16px 0;
            font-size: 16px;
            color: #242424;
          }
          .nums {
            width: 216px;
            height: 48px;
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
            .numsItem {
              flex: 1 1 50%;
              font-weight: 500;
              color: #242424;
              display: flex;
              flex-direction: column;
              align-items: center;
              .num {
                height: 19px;
                line-height: 19px;
                font-size: 19px;
                margin-bottom: 10px;
              }
              .text {
                height: 12px;
                line-height: 12px;
                font-size: 12px;
              }
            }
            .split {
              width: 1px;
              height: 48px;
              background-color: #242424;
            }
          }
        }
        .categoriesBox,
        .tagsBox {
          margin-bottom: 20px;
        }
      }

      .blogBox {
        flex: 0 1 auto;
        width: 810px;
        // box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }

}
</style>
