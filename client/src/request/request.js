import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use((response) => {
  const { data } = response;
  return data.datas;
});

export default instance;
