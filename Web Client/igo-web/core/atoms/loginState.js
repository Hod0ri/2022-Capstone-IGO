import { atom } from 'recoil';

//recoil use session
export const atomUserNick = atom({
  default: '',
  key: `atomUserNick/${Math.random().toString(36)}`,
});

export const atomUserDriver = atom({
  default: false,
  key: `atomUserDriver/${Math.random().toString(36)}`,
});
