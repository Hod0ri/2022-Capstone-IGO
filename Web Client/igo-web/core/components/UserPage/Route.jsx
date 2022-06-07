import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Clock from './icon/clock_icon.png';
import DriveRoute from './DriveRoute';
import Male from './icon/Male.png';

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
const Route = ({ startPoint }) => {
  return (
    <RoutContainer>
      <div className="driveWrapper">
        <div className="driverImage">
          <Image alt={'사용자'} src={Male} width={60} height={60} />
        </div>
        <DriveRoute startPoint={startPoint} />
      </div>
      <DriveInfo>
        <Image
          className="Clock"
          src={Clock}
          width={15}
          height={15}
          alt={'Clock'}
        />
        <p>03.30(수) 오전 7시 출발</p>
      </DriveInfo>
      <DriveInfo>
        <p>오전 7시에 카풀하실 분 구합니다.</p>
      </DriveInfo>
    </RoutContainer>
  );
};

export default Route;
