import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
import MapPin from "./icon/pin_icon.png";
import Flag from "./icon/flag_icon.png";
import ArrowDown from "./icon/arrow_down_icon.png";
import Clock from "./icon/clock_icon.png";

const RoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DriveRoute = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 20px;
  p {
    color: ${props=>props.theme.color.lightgray};
    /* font-size: ${props=>props.theme.fontSize.sm}; */
  }
`;

const DrivePoint = styled.div`
  display: flex;
`;

const DriveInfo = styled.div` 
  display: flex;
  width: 80%;
  padding: 3px;
  p {
    color: ${props=>props.theme.color.lightgray};
  };
  p:nth-child(2){
    margin-left: 5px;
  }
  & + & {
    border-top: 1px solid black;
  }
`;
const Route = () => {
  return(
    <RoutContainer>
      <DriveRoute>
        <DrivePoint>
          <Image className='MapPin'src={MapPin} width={15} height={15} alt={"MapPin"} />
          <p>경기도 광명시 철산동</p>
        </DrivePoint>
        <Image className='ArrowDown'src={ArrowDown} width={15} height={15} alt={"ArrowDown"} />
        <DrivePoint>
          <Image className='Flag'src={Flag} width={15} height={15} alt={"Flag"} />
          <p>경기도 안양시 비산동</p>
        </DrivePoint>
      </DriveRoute>
    
      <DriveInfo>
        <Image className='Clock' src={Clock} width={15} height={15} alt={"Clock"} />
        <p>03.30(수) 오전 7시 출발</p>
      </DriveInfo>
      <DriveInfo>
        <p>오전 7시에 카풀하실 분 구합니다.</p>
      </DriveInfo>
      
    </RoutContainer>        
  );
}

export default Route;