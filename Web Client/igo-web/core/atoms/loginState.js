import { atom } from 'recoil';

//recoil use session
export const atomUserNick = atom({
  default: '',
  key: `atomUserNick/${Math.random().toString(36)}`,
});
