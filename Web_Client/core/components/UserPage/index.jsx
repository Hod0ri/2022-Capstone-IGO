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

const UserPage = ({ type, confirm, ...v }) => {
  return (
    <UserPageContainer>
      {type === 'home' || type === 'car' || type === 'DriverHome' ? (
        <Reservation type={type} confirm={confirm} {...v} />
      ) : (
        <Payment {...v} />
      )}
    </UserPageContainer>
  );
};

export default UserPage;
