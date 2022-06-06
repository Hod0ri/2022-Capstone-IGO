import React from 'react';
import styled from 'styled-components';
import MapPin from './icon/pin_icon.png';
import Flag from './icon/flag_icon.png';
import ArrowDown from './icon/arrow_down_icon.png';
import Image from 'next/image';

const DriveRouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 20px;
  p {
    color: ${(props) => props.theme.color.lightgray};
    /* font-size: ${(props) => props.theme.fontSize.sm}; */
  }
`;

const DrivePoint = styled.div`
  display: flex;
`;

const DriveRoute = ({ startPoint }) => {
  return (
    <DriveRouteContainer>
      <DrivePoint>
        <Image
          className="MapPin"
          src={MapPin}
          width={15}
          height={15}
          alt={'MapPin'}
        />
        <p>{startPoint}</p>
      </DrivePoint>
      <Image
        className="ArrowDown"
        src={ArrowDown}
        width={15}
        height={15}
        alt={'ArrowDown'}
      />
      <DrivePoint>
        <Image
          className="Flag"
          src={Flag}
          width={15}
          height={15}
          alt={'Flag'}
        />
        <p>대림대학교</p>
      </DrivePoint>
    </DriveRouteContainer>
  );
};

export default DriveRoute;
