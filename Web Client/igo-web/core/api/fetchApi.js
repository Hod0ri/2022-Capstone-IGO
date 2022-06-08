import axios from 'axios';
const BASE_URL = 'https://igo.soplay.dev/api';

axios.defaults.withCredentials = true;

export const fetchApi = {
  point: {
    post: async (data) => await axios.post(`${BASE_URL}/point/`, data),
    get: async () => await axios.get(`https://igo.soplay.dev/api/point/`),
  },
};
