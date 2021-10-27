import axios from './request';

const api = {
  /**
   * 添加博客文章
   * @param {string} title 标题
   * @param {boolean} from 来源（true: 原创 | false: 转载）
   * @param {string} author 作者
   * @param {string} content 文章内容-md格式的字符串
   * @param {string} CategoryId 种类id
   * @param {array} Tags 标签id数组
   * @returns res
   */
  async addBlog(title, from, author, content, CategoryId, Tags) {
    const res = await axios.post('/api/blogs', {
      title,
      from,
      author,
      content,
      CategoryId,
      Tags,
    });
    return res;
  },
};

export default api;
