import React from 'react';
import styled from 'styled-components';
import Route from './Route';
import ReservationButton from './ReservationButton';
import Review from './Review';

const ReservationContainer = styled.div`
  border: 2px solid ${(props) => props.theme.color.gray};
  margin-top: 20px;
  padding: 15px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-height: 250px;
  height: auto;
  background: ${(props) => props.theme.color.white};
`;

const Reservation = (props) => {
  return (
    <ReservationContainer>
      <Route {...props} />
      <ReservationButton />
      <Review />
    </ReservationContainer>
  );
};

export default Reservation;
