import React from 'react';
import Reservation from './Reservation';
import styled from 'styled-components';

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserPage = ({ startPoint = '대림역' }) => {
  return (
    <UserPageContainer>
      <Reservation startPoint={startPoint} />
    </UserPageContainer>
  );
};

export default UserPage;
