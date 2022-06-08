import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import { atomUserDriver, atomUserNick } from '../atoms/loginState';

export default function useLoginState() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const setUserNick = useSetRecoilState(atomUserNick);
  const setUserDriver = useSetRecoilState(atomUserDriver);
  let loginState = false;
  const { data, error } = useSWR(
    'https://igo.soplay.dev/api/auth/user',
    fetcher
  );
  if (!error && data) {
    loginState = true;
    setUserNick(data.user_Nick);
    setUserDriver(data.user_Driver);
  }

  return { loginState };
}
