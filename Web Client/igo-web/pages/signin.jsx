import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchAuth } from '../core/api/fetchAuth';
import SignIn from '../core/components/SignIn';

const SignInPage = () => {
  const [state, setState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      await fetchAuth
        .refresh()
        .then((res) => {
          router.push('/');
        })
        .catch((e) => {});
    };
    !state && logout();
  }, [state]);

  return <SignIn />;
};

export default SignInPage;
