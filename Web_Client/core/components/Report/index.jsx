import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { fetchApi } from '../../api/fetchApi';
import Loading from '../Common/Loading';

import ReportCard from './ReportCard';
import ReportState from './ReportState';

const Report = () => {
  const [fetchMatchlogData, setFetchMatchlogData] = useState('');
  const [fetchDataType, setFetchDataType] = useState('');
  const [myReportData, setMyReportData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getchReportLog = async () => {
      await fetchApi.issue
        .get()
        .then((res) => setMyReportData(res.data.result))
        .catch((e) => console.log('신고내역 없음'));
    };
    const fetchMatch = async () => {
      setIsLoading(true);
      await fetchApi.matchlog
        .get()
        .then((res) => {
          setFetchDataType(res.data.data[0]['mc_Driver'] ? 'mc' : 'mm');
          setFetchMatchlogData(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          setFetchMatchlogData(false);
        });
      setIsLoading(false);
    };

    fetchMatchlogData === '' && fetchMatch();
    !myReportData && getchReportLog();
  });
  if (isLoading) return <Loading />;
  return (
    <ReportCardContainer>
      {fetchMatchlogData ? (
        <>
          {fetchMatchlogData.map((value, index) => {
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
          {myReportData && (
            <div className="w-70">
              <h1>신고 기록</h1>
              {myReportData.map((value, index) => (
                <ReportState {...value} key={`reprotState_${index}`} />
              ))}
            </div>
          )}
        </>
      ) : (
        <ReportNoData>📢 IGO 이용 기록이 없습니다!!</ReportNoData>
      )}
    </ReportCardContainer>
  );
};
const ReportCardContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .w-70 {
    width: 70%;
    h1 {
      margin-top: 10px;
      font-size: ${(props) => props.theme.fontSize.lg};
      color: ${(props) => props.theme.color.gray};
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
`;
const ReportNoData = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.color.black};
  padding: 100px 0;
`;

export default Report;
