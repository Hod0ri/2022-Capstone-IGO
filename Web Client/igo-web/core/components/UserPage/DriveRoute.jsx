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
  /* height: 60px; */
  /* margin-bottom: 20px; */
  p {
    color: ${(props) => props.theme.color.lightgray};
    padding-left: 10px;
    /* font-size: 18px; */
  }
  color: ${(props) => props.theme.color.lightgray};
`;

const DrivePoint = styled.div`
  display: flex;
`;

const DriveRoute = ({ size, startPoint }) => {
  return (
    <DriveRouteContainer>
      <DrivePoint>
        <Image
          className="MapPin"
          src={MapPin}
          width={size}
          height={size}
          alt={'MapPin'}
        />
        <p>{startPoint}</p>
      </DrivePoint>
      <Image
        className="ArrowDown"
        src={ArrowDown}
        width={size}
        height={size}
        alt={'ArrowDown'}
      />
      <DrivePoint>
        <Image
          className="Flag"
          src={Flag}
          width={size}
          height={size}
          alt={'Flag'}
        />
        <p>대림대학교</p>
      </DrivePoint>
    </DriveRouteContainer>
  );
};

export default DriveRoute;
