import axios from 'axios';
const BASE_URL = 'https://igo.soplay.dev/api';

axios.defaults.withCredentials = true;

export const fetchApi = {
  point: {
    post: async (data) => await axios.post(`${BASE_URL}/point/`, data),
    get: async () => await axios.get(`${BASE_URL}/point/`),
  },
  issue: {
    post: async (data) => await axios.post(`${BASE_URL}/issue/`, data),
    get: async () => await axios.get(`${BASE_URL}/issue/`),
  },
  match: {
    post: async (data) => await axios.post(`${BASE_URL}/match/`, data),
    get: async () => await axios.get(`${BASE_URL}/match/`),
  },
  matchlog: {
    post: async (data) => await axios.post(`${BASE_URL}/matchlog/`, data),
    get: async () => await axios.get(`${BASE_URL}/matchlog/`),
    put: async (data) => await axios.put(`${BASE_URL}/matchlog/`, data),
    delete: async (data) =>
      await axios.delete(
        `${BASE_URL}/matchlog${data ? `?mm_Member=${data}` : `/`}`
      ),
  },
  search: {
    //현재 기능은 출발지만 구현되어 있어서 쿼리로 arrive만 보낸다
    get: async (query) =>
      await axios.get(`${BASE_URL}/search?arrive=${query ? query : ''}`),
  },
};
