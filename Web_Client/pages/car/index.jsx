import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchApi } from '../../core/api/fetchApi';
import Auth from '../../core/components/Common/Auth';
import Loading from '../../core/components/Common/Loading';
import UserPage from '../../core/components/UserPage';

const CarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin-top: 25px;
    margin-left: 75px;
    font-size: ${(props) => props.theme.fontSize.md};
  }
`;
const NonCarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 100px auto;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;
const Car = () => {
  const [reservationData, setReservationData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      await fetchApi.match
        .get()
        .then((res) => {
          setIsLoading(true);
          setReservationData(res.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    };
    !reservationData && getData();
  }, [reservationData, isLoading]);

  return (
    <Auth auth={true}>
      {!isLoading ? (
        <Loading />
      ) : reservationData ? (
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
      ) : (
        <NonCarPageContainer>
          <p>📢 현재 예약한 카풀 목록이 없습니다.</p>
        </NonCarPageContainer>
      )}
    </Auth>
  );
};

export default Car;
