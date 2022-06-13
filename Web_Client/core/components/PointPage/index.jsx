import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CurrentPoint from './CurrentPoint';
import UsageHistory from './UsageHistory';
import axios from 'axios';
import { fetchApi } from '../../api/fetchApi';
import Loading from '../Common/Loading';

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
  const [isLoading, setIsLoading] = useState(false);
  const getPoint = async () => {
    await fetchApi.point
      .get()
      .then((res) => {
        setIsLoading(true);
        setPoint(res.data.result);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    !point && getPoint();
  }, [point, isLoading]);

  return (
    <>
      {!isLoading ? (
        <Loading />
      ) : (
        <PointPageContainer>
          <CurrentPoint
            pot_Amount={point && point[0].pot_Amount}
            onResetData={() => getPoint()}
          />
          {point &&
            point.map((v, index, arr) => {
              if (index !== arr.length - 1)
                return <UsageHistory {...v} key={index} />;
            })}
        </PointPageContainer>
      )}
    </>
  );
};

export default PointPage;
