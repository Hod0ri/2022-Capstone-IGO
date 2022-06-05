import axios from 'axios';

const BASE_URL = 'https://igo.soplay.dev/api/auth';

axios.defaults.withCredentials = true;
//회원 가입
export default fetchAuth = {
  create: async (data) => await axios.post(`${BASE_URL}/user`, data),
  refresh: async () => await axios.get(`${BASE_URL}/user`),
  update: async (data) => await axios.put(`${BASE_URL}/user`, data),
  delete: async (data) => await axios.delete(`${BASE_URL}/user`, data),
  login: async (data) => await axios.post(`${BASE_URL}/user/login`, data),
  logout: async () => await axios.get(`${BASE_URL}/user/logout`),
};
