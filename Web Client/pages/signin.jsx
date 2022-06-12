import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { fetchAuth } from '../core/api/fetchAuth';
import Auth from '../core/components/Common/Auth';
import SignIn from '../core/components/SignIn';
import useLoginState from '../core/hooks/useLoginState';

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignInPage = () => {
  const [state, setState] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      await fetchAuth
        .refresh()
        .then(() => {
          useLoginState();
          router.push('/');
        })
        .catch((e) => {});
    };
    !state && logout();
  }, [state]);

  return (
    <Auth>
      <SignInContainer>
        <SignIn />
      </SignInContainer>
    </Auth>
  );
};

export default SignInPage;
