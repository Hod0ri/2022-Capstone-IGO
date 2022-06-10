import React from 'react';
import Auth from '../core/components/Common/Auth';
import ModalCard from '../core/components/ModalCard';

const Report = () => {
  return (
    <Auth auth={true}>
      {/* <div>신고페이지입니다.</div> */}
      <ModalCard userNick={'방어운전'} />
    </Auth>
  );
};

export default Report;
