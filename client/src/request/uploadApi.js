import axios from './request';

const api = {
  async uploadImg(formData) {
    const res = await axios.post('/api/upload/img', formData);
    return res;
  },
};

export default api;
