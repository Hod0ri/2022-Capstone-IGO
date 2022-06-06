import React from 'react';
import styled from 'styled-components';
import Route from './Route';
import ReservationButton from './ReservationButton';
import Review from './Review';
import Button from '../Common/Button';

const ReservationContainer = styled.div`
  border: 2px solid ${(props) => props.theme.color.gray};
  margin-top: 25px;
  padding: 20px 30px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-height: 250px;
  height: auto;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.color.white};
`;

const Reservation = (props) => {
  return (
    <ReservationContainer>
      <Route {...props} />
      {/* <ReservationButton /> */}
      <Button color="green" round="true">
        예약하기
      </Button>
      <Review />
    </ReservationContainer>
  );
};

export default Reservation;
