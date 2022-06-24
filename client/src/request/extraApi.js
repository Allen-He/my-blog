import axios from './request';

const api = {
  /**
   * 获取额外信息（网站首页访问量、...）
   * @returns res {pageViews: 0}
   */
  async getExtra() {
    const res = await axios.get('/api/extra');
    return res;
  },
};

export default api;
