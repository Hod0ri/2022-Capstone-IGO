import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
import DollarCoin from "./icon/dollar_icon.png";

const CurrentPointContaniner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex;
  /* width: 100%; */
  margin-top: 15px;
  margin-bottom: 30px;
  padding-top: 5px;
  p {
    font-size: ${props=>props.theme.fontSize.md};
  };
`;

const PointContainer = styled.div`
  margin-top: 15px;
  border-radius: 30px;
  background: #F8F8F8;
  /* background: ${props=>props.theme.color.lightgray}; */
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
  border-radius: 5px;
  background: ${props=>props.theme.color.black};
  color: ${props=>props.theme.color.lightgray};
  width: 70px;
  height: 30px;
  justify-self: right;
  &:hover {
    cursor: pointer;
  };
  &:active {
    opacity: 0.8;
  }
`;

const CurrentPoint = () => {
  return(
    <CurrentPointContaniner className="pointWrapContainer">
      <p>현재 보유 포인트</p>
      <PointContainer>
        <div className='pointDiv'>
          <Image className='DollarCoin'src={DollarCoin} width={50} height={50} alt={"DollarCoin"} />
          <p>5,000P</p>
        </div>
        <ChargeButton>충전하기</ChargeButton>
      </PointContainer>
    </CurrentPointContaniner>
  );
}

export default CurrentPoint;