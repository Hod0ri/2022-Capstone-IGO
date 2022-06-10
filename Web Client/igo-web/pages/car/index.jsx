import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchApi } from '../../core/api/fetchApi';
import Auth from '../../core/components/Common/Auth';
import UserPage from '../../core/components/UserPage';

const CarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin-top: 25px;
    margin-left: 75px;
    font-size: ${(props) => props.theme.fontSize.md};
    /* border: 1px solid black; */
  }
`;
const Car = () => {
  const [reservationData, setReservationData] = useState('');
  useEffect(() => {
    const getData = async () => {
      await fetchApi.match
        .get()
        .then((res) => {
          setReservationData(res.data);
          console.log(reservationData);
        })
        .catch((e) => {
          console.log(e.response);
        });
    };
    !reservationData && getData();
  }, [reservationData]);

  return (
    <Auth auth={true}>
      <CarPageContainer>
        <h1>예약 확정 대기 목록</h1>
        {reservationData &&
          reservationData.data
            .filter((e) => e['mm_Match'] === false)
            .map((v, index) => {
              return (
                <UserPage type={'car'} confirm={false} {...v} key={index} />
              );
            })}
        <h1>예약 확정 목록</h1>
        {reservationData &&
          reservationData.data
            .filter((e) => e['mm_Match'] === true)
            .map((v, index) => {
              return (
                <UserPage type={'car'} confirm={true} {...v} key={index} />
              );
            })}
      </CarPageContainer>
    </Auth>
  );
};

export default Car;
