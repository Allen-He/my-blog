import axios from './request';
import BASE from './base';

const api = {
  async login(loginId, loginPwd) {
    const res = await axios.post('/api/admin/login', { loginId, loginPwd });
    return res;
  },
  async whoAmI() {
    const res = await axios.get('/api/admin/whoami');
    return res;
  },
  async logout() {
    localStorage.removeItem(BASE.TOKEN_NAME);
  },
};

export default api;
