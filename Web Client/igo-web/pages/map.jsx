import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../core/components/Common/Button';
import Map from '../core/components/KakaoMap';
import UserLogo from '../core/components/UserLogo';
import DriveRoute from '../core/components/UserPage/DriveRoute';

const MapPage = () => {
  const route = useRouter();
  const [startPoint = '신도림', driverNick = '넘어오지 않음'] = [
    route.query.startPoint,
    route.query.driverNick,
  ];

  console.log(startPoint, driverNick);
  console.log(route.query);

  return (
    <>
      <MapContainer>
        <UserLogo nickname={driverNick} />
        <div id="mapSizeContaier">
          <DriveRoute startPoint={`${startPoint}역`} />
          <Map location={startPoint} />

          <Button size="md" className="btnSize">
            예약하기
          </Button>
        </div>
      </MapContainer>
    </>
  );
};

const MapContainer = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  #mapSizeContaier {
    width: 80%;
    button {
      margin-top: 15px;
      margin-bottom: 20px;
    }
  }
`;
export default MapPage;
