import React from 'react';
import Reservation from './Reservation';
import styled from 'styled-components';
import UserLogo from '../UserLogo';

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const UserPage = ({ startPoint = '대림역' }) => {
  return (
    <UserPageContainer>
      <UserLogo />
      <Reservation startPoint={startPoint} />
    </UserPageContainer>
  );
};

export default UserPage;
