import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Clock from './icon/clock_icon.png';
import DriveRoute from './DriveRoute';
import Male from './icon/Male.png';
import { useRecoilValue } from 'recoil';
import { atomUserDriver } from '../../atoms/loginState';

const RoutContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  &:nth-child(1) {
    display: flex;
    align-items: start;
  }
  .driveWrapper {
    display: flex;
  }
  .driverImage {
    margin-right: 20px;
  }
`;

const DriveInfo = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  p {
    color: ${(props) => props.theme.color.lightgray};
  }
  p:nth-child(2) {
    margin-left: 5px;
  }
  & + & {
    border-top: 1px solid black;
  }
`;
const Route = ({ ...v }) => {
  const { type, mc_Arrive, mc_ArriveTime, mm_Arrive, mm_ArriveTime } = v;
  const isDriver = useRecoilValue(atomUserDriver);
  const Arrive = type === 'home' || type === 'report' ? mc_Arrive : mm_Arrive;
  const ArriveTime =
    type === 'home' || type === 'report' ? mc_ArriveTime : mm_ArriveTime;
  let day = new Date(ArriveTime);
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  let week = WEEKDAY[day.getDay()];
  return (
    <RoutContainer>
      <div className="driveWrapper">
        <div className="driverImage">
          <Image alt={'사용자'} src={Male} width={60} height={60} />
        </div>
        <DriveRoute startPoint={Arrive} />
      </div>
      <DriveInfo>
        <Image
          className="Clock"
          src={Clock}
          width={15}
          height={15}
          alt={'Clock'}
        />
        <p>
          {ArriveTime.slice(5, 10)}({week}) {ArriveTime.slice(11, 13)}시{' '}
          {ArriveTime.slice(14, 16)}분 출발
        </p>
      </DriveInfo>
      <DriveInfo>
        {type === 'report' ? (
          <p>{`${isDriver ? '탑승자' : '운전자'} : ${v.mc_Driver}`}</p>
        ) : (
          <p>
            {ArriveTime.slice(11, 13)}시 {ArriveTime.slice(14, 16)}분에 카풀하실
            분 구합니다.
          </p>
        )}
      </DriveInfo>
    </RoutContainer>
  );
};

export default Route;
