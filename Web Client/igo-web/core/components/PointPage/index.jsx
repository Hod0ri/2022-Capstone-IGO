import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CurrentPoint from './CurrentPoint';
import UsageHistory from './UsageHistory';
import axios from 'axios';
import { fetchApi } from '../../api/fetchApi';

const PointPageContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  /* margin-bottom: 50px; */
  /* border: 1px solid black; */
`;

const PointPage = () => {
  const [point, setPoint] = useState('');
  useEffect(() => {
    const getPoint = async () => {
      await fetchApi.point
        .get()
        .then((res) => {
          setPoint(res.data.result);
        })
        .catch((e) => {});
    };
    !point && getPoint();
  }, [point]);
  return (
    <PointPageContainer>
      <CurrentPoint pot_Amount={point && point[0].pot_Amount} />
      {point &&
        point.map((v, index) => {
          return <UsageHistory {...v} key={index} />;
        })}
    </PointPageContainer>
  );
};

export default PointPage;
