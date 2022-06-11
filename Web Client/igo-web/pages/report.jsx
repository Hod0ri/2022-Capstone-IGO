import React from 'react';
import Auth from '../core/components/Common/Auth';
import Report from '../core/components/Report';

const ReportPage = () => {
  return (
    <Auth auth={true}>
      <Report />
    </Auth>
  );
};

export default ReportPage;
