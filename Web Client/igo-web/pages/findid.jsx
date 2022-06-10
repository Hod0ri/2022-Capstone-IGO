import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLoginState from '../core/hooks/useLoginState';
import Auth from '../core/components/Common/Auth';
import FindId from '../core/components/FindId';
import { fetchAuth } from '../core/api/fetchAuth';

const findid = () => {
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
      <FindId />
    </Auth>
  );
};

export default findid;
