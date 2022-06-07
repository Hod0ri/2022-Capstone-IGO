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
  const [point, setPoint] = useState('');
  useEffect(() => {
    const getPoint = async () => {
      await fetchApi.point
        .get()
        .then((res) => {
          console.log(res.data.result);
          setPoint(res.data.result);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    !point && getPoint();
  }, [point]);
  return (
    <UserPageContainer>
      {/* <Reservation startPoint={startPoint} /> */}
      {/* <Payment startPoint={startPoint} /> */}
      {point && (
        <Payment startPoint={startPoint} pot_Amount={point[0].pot_Amount} />
      )}
    </UserPageContainer>
  );
};

export default UserPage;
