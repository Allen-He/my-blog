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
        <div class="blogBox">博客内容</div>
        <div class="infoBox">
          <div class="info">
            <img class="avator" src="~@/assets/logo.png" alt="" />
            <h3 class="name">而已</h3>
            <div class="nums">
              <div class="numsItem">
                <span class="num">80</span>
                <span class="text">Article</span>
              </div>
              <div class="split"></div>
              <div class="numsItem">
                <span class="num">36</span>
                <span class="text">Tag</span>
              </div>
            </div>
          </div>
          <div class="categoriesBox">种类</div>
          <div class="tagsBox">标签</div>
        </div>
      </div>
    </div>
    <FooterBar/>
  </div>
</template>

<script>
import FooterBar from '../components/FooterBar.vue';

export default {
  components: {
    FooterBar,
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
                font-size: 19px;
                margin-bottom: 10px;
              }
              .text {
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
      }

      .blogBox {
        flex: 0 1 auto;
        width: 810px;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }

}
</style>
