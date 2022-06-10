import { useRouter } from 'next/router';
import React from 'react';
import useLoginState from '../../hooks/useLoginState';
import Loading from './Loading';

const Auth = ({ auth = false, children }) => {
  const { loginState, isLoading } = useLoginState();
  const router = useRouter();
  const notLoginPages = ['/signin', '/signup'];
  console.log('isLoading : ', isLoading);
  if (isLoading) return <Loading />;
  if ((loginState && auth) || (!loginState && !auth)) {
    return children;
  } else {
    //로그아웃상태의 페이지 진입시
    const isInner = notLoginPages.includes(router.asPath);
    if (auth) {
      router.push('/signin');
    } else {
      router.push('/');
    }
  }
  return <Loading />;
};

export default Auth;
