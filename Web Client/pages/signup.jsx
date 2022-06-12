import React from 'react';
import Auth from '../core/components/Common/Auth';
import SignUp from '../core/components/SignUp';

const SignUpPage = () => {
  return (
    <Auth>
      <SignUp />
    </Auth>
  );
};

export default SignUpPage;
