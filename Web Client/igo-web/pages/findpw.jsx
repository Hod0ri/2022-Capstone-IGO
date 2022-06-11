import React from 'react';
import Auth from '../core/components/Common/Auth';
import FindPw from '../core/components/FindPw';

const findpw = () => {
  return (
    <Auth>
      <FindPw />
    </Auth>
  );
};

export default findpw;
