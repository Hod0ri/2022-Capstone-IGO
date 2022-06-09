import React, { useState, useEffect } from 'react';
import Reservation from './Reservation';
import Payment from './Payment';
import styled from 'styled-components';
import { fetchApi } from '../../api/fetchApi';

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserPage = ({ startPoint = '안양' }) => {
  return (
    <UserPageContainer>
      {/* <Reservation startPoint={startPoint} /> */}
      {<Payment startPoint={startPoint} />}
    </UserPageContainer>
  );
};

export default UserPage;
