import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import DollarCoin from './icon/dollar_icon.png';
import axios from 'axios';

const CurrentPointContaniner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 5px;

  p {
    font-size: ${(props) => props.theme.fontSize.md};
  }
`;

const PointContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
  border-radius: 30px;
  background: #f8f8f8;
  /* background: ${(props) => props.theme.color.lightgray}; */
  display: flex;
  align-items: center;
  padding-right: 15px;
  justify-content: space-between;
  .pointDiv {
    display: flex;
    align-items: center;
  }
`;

const ChargeButton = styled.button`
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.color.lightgray};
  color: ${(props) => props.theme.color.gray};
  width: 70px;
  height: 30px;
  justify-self: right;
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.8;
  }
`;

const CurrentPoint = ({ pot_Amount }) => {
  return (
    <CurrentPointContaniner className="pointWrapContainer">
      <p>현재 보유 포인트</p>
      <PointContainer>
        <div className="pointDiv">
          <Image
            className="DollarCoin"
            src={DollarCoin}
            width={50}
            height={50}
            alt={'DollarCoin'}
          />
          <p>{pot_Amount.toLocaleString()}P</p>
        </div>
        <ChargeButton>충전하기</ChargeButton>
      </PointContainer>
      <p>포인트 이용내역</p>
    </CurrentPointContaniner>
  );
};

export default CurrentPoint;
