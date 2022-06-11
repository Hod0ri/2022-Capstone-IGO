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
          alert('서버 통신 오류');
          console.log(err.response.data);
        });
    };
    !fetchMatchlogData && fetchMatch();
  });

  // const data = [
  //   {
  //     mm_Driver: '운전자닉네임',
  //     mm_Member: '탑승자닉네임',
  //     mm_ArriveTime: '2022-05-30 10:10',
  //     mm_Arrive: '독산',
  //     mm_Goal: '',
  //     mm_Price: 2000,
  //     mm_Match: true,
  //   },
  // {
  //   mm_Driver: 'user3',
  //   mm_Member: 'user4',
  //   mm_ArriveTime: '2022-05-30 10:10',
  //   mm_Arrive: '대림',
  //   mm_Goal: '',
  //   mm_Price: 3000,
  //   mm_Match: false,
  // },
  // ];
  // ns_Target	String	✔️
  // ns_Reason	String	✔️
  // ns_Etc

  return (
    <ReportCardContainer>
      {fetchMatchlogData &&
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
        })}
    </ReportCardContainer>
  );
};
const ReportCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Report;
