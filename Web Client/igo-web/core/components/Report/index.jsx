import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { fetchApi } from '../../api/fetchApi';

import ReportCard from './ReportCard';

const Report = () => {
  const [fetchMatchlogData, setFetchMatchlogData] = useState('');
  const [fetchDataType, setFetchDataType] = useState('');
  useEffect(() => {
    const fetchMatch = async () => {
      await fetchApi.matchlog
        .get()
        .then((res) => {
          setFetchDataType(res.data[`mc_Driver`] ? 'mc' : 'mm');
          setFetchMatchlogData(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    !fetchMatchlogData && fetchMatch();
  });

  return (
    <ReportCardContainer>
      {fetchMatchlogData ? (
        fetchMatchlogData.map((value, index) => {
          const data = {
            mm_Driver: value[`${fetchDataType}_Driver`],
            mm_Member: value[`${fetchDataType}_Member`],
            mm_ArriveTime: value[`${fetchDataType}_ArriveTime`],
            mm_Arrive: value[`${fetchDataType}_Arrive`],
            mm_Goal: value[`${fetchDataType}_Goal`],
            mm_Price: value[`${fetchDataType}_Price`],
            mm_Match: value[`${fetchDataType}_Match`],
          };
          return <ReportCard {...data} key={`reportCard_${index}`} />;
        })
      ) : (
        <ReportNoData>IGO 이용 기록이 없습니다!!</ReportNoData>
      )}
    </ReportCardContainer>
  );
};
const ReportCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReportNoData = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.color.gray};
  padding: 30px 0;
`;

export default Report;
