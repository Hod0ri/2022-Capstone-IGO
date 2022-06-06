import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchAuth } from '../core/api/fetchAuth';
import SignUp from '../core/components/SignUp';

const SignUpPage = () => {
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
  return <SignUp />;
};

export default SignUpPage;
