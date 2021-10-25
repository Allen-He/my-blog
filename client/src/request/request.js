import axios from 'axios';
import BASE from './base';

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(BASE.TOKEN_NAME);
  // 发送请求的时候，如果有token，需要附带到请求头中
  let resConfig = config;
  if (token) {
    resConfig = {
      ...resConfig,
      headers: {
        authorization: `bearer ${token}`,
      },
    };
  }
  return resConfig;
});

instance.interceptors.response.use((response) => {
  const { data, headers } = response;
  // 响应的时候，如果有token，保存token到本地（localStorage）
  if (headers.authorization) {
    localStorage.setItem(BASE.TOKEN_NAME, headers.authorization);
  }
  return data.datas;
}, (err) => {
  // 响应的时候，如果响应的消息码是403（没有token，token失效），在本地删除token
  if (err.response.status === 403) {
    localStorage.removeItem(BASE.TOKEN_NAME);
  }
  return Promise.reject(err);
});

export default instance;
