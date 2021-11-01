<template>
  <div class="about">
    <div class="info">
      <h2>关于我</h2>
      <div class="content">
        <p>
          一个正在努力成长的前端开发小白，22届本科，电子商务专业，坐标四川成都。21年暑假，在“哈啰出行”前端开发岗实习，最终顺利拿到转正offer。
          闲暇之余，喜欢浏览一些技术博客。喜欢阅读、听歌、追剧、睡懒觉。当然，跑步、打乒乓也少不了。
        </p>
      </div>
      <h2>技术栈</h2>
      <div class="content">
        <p>语言：HTML(5)、CSS(3)、JavaScript（ES6+）、TypeScript</p>
        <p>JS库：jQuery、mock、lodash、moment</p>
        <p>计算机基础：网络的相关知识（Ajax、跨域、本地化存储等）、数据结构与算法</p>
        <p>工程化：Webpack（基本使用、编译过程、性能优化等）、Babel、各种模块化标准、包管理工具、Git</p>
        <p>前端框架：Vue全家桶（熟悉底层原理）、React（学习中...）</p>
        <p>后端：NodeJS、Mysql、Sequelize、Express</p>
        <p>UI库：AntDesign、Vant</p>
      </div>
      <h2>项目经验</h2>
      <div class="content project">
        <a-timeline mode="alternate">
          <a-timeline-item color="#3eaf7c">
            <a href="https://allen-he.github.io/MusicPlayer/dist/html/index.html" target="_blank">“酷听”音乐播放器 2021-01</a>
          </a-timeline-item>
          <a-timeline-item color="#3eaf7c">
            <a href="https://allen-he.github.io/mall-admin-app/" target="_blank">“生鲜超值购”商品管理系统 2021-03</a>
          </a-timeline-item>
          <a-timeline-item color="#3eaf7c">
            <a href="https://allen-he.github.io/mall-user-app/" target="_blank">“生鲜超值购”移动端商城 2021-04</a>
          </a-timeline-item>
          <a-timeline-item color="#3eaf7c">
            <a href="https://github.com/Allen-He/my_vue" target="_blank">自行封装小型MVVM框架 2021-10</a>
          </a-timeline-item>
          <a-timeline-item>
            <a href="https://github.com/Allen-He/my-blog" target="_blank">全栈个人博客网站（NodeJS + Vue） 2021-10</a>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  width: 100%;
  min-width: 900px;
  height: calc(100vh - 58px);
  overflow: hidden;
  background: url(~@/assets/imgs/home.bg.svg) no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  .info {
    width: 60%;
    color: #242424;
    h2 {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      line-height: 30px;
      margin-top: 25px;

      &:first-of-type {
        margin: 0;
      }
      &:last-of-type {
        margin: 10px;
      }
    }
    .content {
      p {
        font-size: 16px;
        line-height: 25px;
      }
      &.project {
        display: inline-block;
        height: 212px;
        padding-top: 10px;
        display: flex;
        justify-content: center;
        overflow: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        a {
          color: #242424;
          &:hover {
            color: #3eaf7c;
          }
        }
      }
    }
  }
}
</style>
