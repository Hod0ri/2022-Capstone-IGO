import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import { atomUserNick } from '../atoms/loginState';

export default function useLoginState() {
  const fetcher = (url) => axios.get(url).then((res) => res.data.user_Nick);
  const setUserNick = useSetRecoilState(atomUserNick);
  let loginState = false;
  const { data, error } = useSWR(
    'https://igo.soplay.dev/api/auth/user',
    fetcher
  );
  if (!error && data) {
    loginState = true;
    setUserNick(data);
  }

  return { loginState };
}
