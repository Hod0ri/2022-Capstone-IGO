import axios from 'axios';

const BASE_URL = 'https://igo.soplay.dev/api/auth';

axios.defaults.withCredentials = true;
//회원 가입
const fetchCreateUser = async (data) =>
  await axios.post(`${BASE_URL}/user`, data);

//최초 로그인
const fetchLogin = async (data) =>
  await axios.post(`${BASE_URL}/user/login`, data);

//토큰 갱신
const fetchTokenRefresh = async () => await axios.get(`${BASE_URL}/user`);

//회원 수정
const fetchUpdateUser = async (data) =>
  await axios.put(`${BASE_URL}/user`, data);

//회원 탈퇴
const fetchDeleteUser = async (data) =>
  await axios.delete(`${BASE_URL}/user`, data);

//로그아웃
const fetchLogout = async () =>
  await axios.get(`${BASE_URL}/user/logout`, data);

export {
  fetchCreateUser,
  fetchLogin,
  fetchTokenRefresh,
  fetchUpdateUser,
  fetchDeleteUser,
  fetchLogout,
};
