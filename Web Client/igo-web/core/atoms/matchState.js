import { atom } from 'recoil';

// {
//     "mc_Driver": "user0",
//     "mc_Arrive": "신도림",
//     "mc_ArriveTime": "2022-06-13T10:00:00",
//     "mc_Goal": "대림대학교",
//     "mc_Price": 3000,
//     "mc_Desc": null,
//     "mc_Count": 3
// }
export const atomMatchDetail = atom({
  default: '',
  key: `atomMatchDetail/${Math.random().toString(36)}`,
});
