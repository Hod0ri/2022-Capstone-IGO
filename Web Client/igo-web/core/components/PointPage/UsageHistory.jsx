import React from 'react';
import styled from 'styled-components';

const UsageHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  p {
    font-size: ${props=>props.theme.fontSize.md};
  }
`;

const PointHistory = styled.div`
  border-top: 2px solid ${props=>props.theme.color.black};
  border-bottom: 2px solid ${props=>props.theme.color.black};
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  padding: 20px;
  margin-top: 10px;
  .leftDiv {
    display: flex;
    align-items: flex-start;
    p{
      &:nth-child(1){
        font-size: ${props=>props.theme.fontSize.sm};
        color : ${props=>props.theme.color.lightgray};
      };
      & + p {
        padding-left: 10px;
      };
    }
  };
  .rightDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .red{
      color: ${props=>props.theme.color.red};
    }
    .blue{
      color: ${props=>props.theme.color.blue};
    }
  };
  & + & {
      border-top: none;
  };
`;

const UsageHistory = ({type="add", data={}}) => {

  const point = 5000;

  return(
    <UsageHistoryContainer >
      <div className='pointWrapContainer'>
        <p>포인트 이용내역</p>
      </div>
      <PointHistory>
        <div className='leftDiv'>
          <p>04.03</p>
          <p>{point.toLocaleString()}P {type==="add"?"쿠폰":"사용"}</p>
        </div>
        <div className='rightDiv'>
          <p>6,500P</p>
          <p className={`${type==="add"?"blue":"red"}`}>{type==="use"&&"-"}{point.toLocaleString()}P</p>
        </div>
      </PointHistory>
    </UsageHistoryContainer>
  );
}

export default UsageHistory;