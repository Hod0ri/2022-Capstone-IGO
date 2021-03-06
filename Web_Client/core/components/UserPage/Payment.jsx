import React, { useEffect, useState } from 'react';
import DriveRoute from './DriveRoute';
import styled from 'styled-components';
import Image from 'next/image';
import Male from '../UserLogo/icon/male.png';
import Button from '../Common/Button';
import { fetchApi } from '../../api/fetchApi';
import { useRecoilValue } from 'recoil';
import useLoginState from '../../hooks/useLoginState';
import { atomMatchDetail } from '../../atoms/matchState';
import { useRouter } from 'next/router';
import StateContainer from '../KakaoMap';
import Map from '../KakaoMap';
const PaymentContainer = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  flex-direction: column;
  h1 {
    font-size: ${(props) => props.theme.fontSize.lg};
    border-bottom: 2px solid ${(props) => props.theme.color.lightgray};
    padding: 15px;
  }
`;

const DriveRouteContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  p {
    color: ${(props) => props.theme.color.lightgray};
  }
  .userLogo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;
    p:nth-child(2) {
      margin-top: 10px;
      color: ${(props) => props.theme.color.black};
    }
  }
`;

const PaymentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  p {
    padding: 15px;
  }
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.color.lightgray};
  .paymentInfo {
    display: flex;
    justify-content: space-between;
    :nth-child(n + 2) {
      border: none;
    }
  }
  .totalPayment {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: ${(props) => props.theme.color.black};
  }
  div {
    & {
      border-top: 2px solid ${(props) => props.theme.color.lightgray};
    }
  }
`;

const Payment = () => {
  const detailData = useRecoilValue(atomMatchDetail);
  const { mc_Driver, mc_Arrive, mc_Price } = detailData;
  const route = useRouter();
  const { isLoading } = useLoginState();
  const [data, setData] = useState('');
  const [pickUp, setPickUp] = useState('');
  const onClickPostReservation = async () => {
    const userReservationData = {
      mm_Driver: `${mc_Driver}`,
      mm_ArriveTime: `${pickUp.split('T').join(' ')}`,
      mm_Arrive: `${mc_Arrive}`,
      mm_Goal: '???????????????',
      mm_Match: 'false',
    };
    await fetchApi.matchlog
      .post(userReservationData)
      .then(() => {
        route.push('/car');
      })
      .catch((e) => {
        e.response;
        alert('????????? ??????????????????!');
      });
  };

  useEffect(() => {
    const getPoint = async () => {
      await fetchApi.point
        .get()
        .then((res) => {
          setData(res.data.result[0]);
        })
        .catch((e) => {});
    };
    !isLoading && !data && getPoint();
  }, [data, isLoading]);

  //=== Map Data Set ===
  const [startPoint = '?????????', driverNick = '???????????? ??????'] = [
    mc_Arrive,
    mc_Driver,
  ];

  return (
    data && (
      <PaymentContainer>
        <h1>????????????</h1>
        <p>
          ?????? ???????????? :{' '}
          <input
            id="pickUp"
            type="datetime-local"
            onChange={(e) => setPickUp(e.target.value)}
          ></input>
        </p>
        <DriveRouteContainer>
          <div className="userLogo">
            <Image alt={'?????????'} src={Male} width={65} height={65} />
            <p>{mc_Driver}</p>
          </div>
          <DriveRoute size={'25px'} startPoint={mc_Arrive} />
        </DriveRouteContainer>
        <MapContainer>
          <Map location={startPoint} />
        </MapContainer>
        <PaymentInfoContainer>
          <div className="paymentInfo">
            <p>?????? ?????????</p>
            <p>{data.pot_Amount.toLocaleString()}p</p>
          </div>
          <div className="paymentInfo">
            <p>????????????</p>
            <p>{mc_Price.toLocaleString()}p</p>
          </div>
          <div className="paymentInfo">
            <p>?????? ?????? ??????</p>
            <p>{(data.pot_Amount - mc_Price).toLocaleString()}p</p>
          </div>
          <div className="totalPayment">
            <p>?????? ????????????</p>
            <p>{mc_Price.toLocaleString()}p</p>
          </div>
        </PaymentInfoContainer>
        <Button onClick={() => onClickPostReservation()}>?????? ????????????</Button>
      </PaymentContainer>
    )
  );
};

const MapContainer = styled.div`
  width: 100%;
  padding: 15px 0;
`;
export default Payment;
