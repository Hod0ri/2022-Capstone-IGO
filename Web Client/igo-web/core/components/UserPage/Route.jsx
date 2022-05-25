import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Clock from './icon/clock_icon.png';
import DriveRoute from './DriveRoute';

const RoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DriveInfo = styled.div`
  display: flex;
  width: 80%;
  padding: 3px;
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
      <DriveRoute startPoint={startPoint} />
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
