import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';

axios.defaults.withCredentials = true;

export const fetchApi = {
  point: {
    post: async (data) => await axios.post(`${BASE_URL}/point/`, data),
    get: async () => await axios.get(`${BASE_URL}/point/`),
  },
};
