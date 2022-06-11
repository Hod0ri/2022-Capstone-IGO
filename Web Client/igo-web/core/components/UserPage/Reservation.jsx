import React from 'react';
import styled from 'styled-components';
import ReservationButton from './ReservationButton';
import Review from './Review';
import Button from '../Common/Button';
import Route from './Route';
import { useSetRecoilState } from 'recoil';
import { atomMatchDetail } from '../../atoms/matchState';
import { useRouter } from 'next/router';

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

const Reservation = ({ onClickReport, ...v }) => {
  const setMatchData = useSetRecoilState(atomMatchDetail);
  const { type, confirm } = v;
  const route = useRouter();
  return (
    <ReservationContainer>
      <Route {...v} />
      {type === 'car' && confirm === false && <ReservationButton {...v} />}
      {type === 'home' && (
        <Button
          color="green"
          round="true"
          onClick={() => {
            setMatchData(v);
            route.push('/car/detail');
          }}
        >
          예약하기
        </Button>
      )}
      {type === 'report' && (
        <Button color="red" size="md" onClick={() => onClickReport()}>
          신고하기
        </Button>
      )}
      <Review />
    </ReservationContainer>
  );
};

export default Reservation;
