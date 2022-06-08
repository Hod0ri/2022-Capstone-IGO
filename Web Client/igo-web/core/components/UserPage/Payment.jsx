import React, { useEffect, useState } from 'react';
import DriveRoute from './DriveRoute';
import styled from 'styled-components';
import Image from 'next/image';
import Male from '../UserLogo/icon/male.png';
import StateContainer from '../KakaoMap';
import Button from '../Common/Button';
import { fetchApi } from '../../api/fetchApi';
import { useRecoilValue } from 'recoil';
import useLoginState from '../../hooks/useLoginState';

const PaymentContainer = styled.div`
  display: flex;
  /* border: 1px solid black; */
  max-width: 400px;
  width: 100%;
  flex-direction: column;
  /* padding: 15px; */
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
    /* & {
      padding-bottom: 15px;
    } */
    & {
      border-top: 2px solid ${(props) => props.theme.color.lightgray};
    }
  }
`;

const Payment = ({ startPoint, userNick = '닉네임X' }) => {
  const { isLoading } = useLoginState();
  const [data, setData] = useState('');
  useEffect(() => {
    const getPoint = async () => {
      await fetchApi.point
        .get()
        .then((res) => {
          setData(res.data.result[0]);
        })
        .catch((e) => {});
    };
    isLoading && !data && getPoint();
  }, [data, isLoading]);

  const mm_Price = 0;
  return (
    data && (
      <PaymentContainer>
        <h1>예약결제</h1>
        <DriveRouteContainer>
          <div className="userLogo">
            <Image alt={'사용자'} src={Male} width={65} height={65} />
            <p>{userNick}</p>
          </div>
          <DriveRoute size={'25px'} startPoint={startPoint} />
          {/* <StateContainer location={startPoint} /> */}
        </DriveRouteContainer>
        <PaymentInfoContainer>
          <div className="paymentInfo">
            <p>보유 포인트</p>
            <p>{data.pot_Amount.toLocaleString()}p</p>
          </div>
          <div className="paymentInfo">
            <p>요금정보</p>
            <p>{mm_Price.toLocaleString()}p</p>
          </div>
          <div className="paymentInfo">
            <p>잔여 요금</p>
            <p>{(data.pot_Amount - mm_Price).toLocaleString()}p</p>
          </div>
          <div className="totalPayment">
            <p>총 결제금액</p>
            <p>{mm_Price.toLocaleString()}p</p>
          </div>
        </PaymentInfoContainer>
        <Button>예약하기</Button>
      </PaymentContainer>
    )
  );
};

export default Payment;
