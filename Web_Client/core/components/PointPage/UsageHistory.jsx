import React from 'react';
import styled from 'styled-components';

const UsageHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  p {
    font-size: ${(props) => props.theme.fontSize.md};
  }
  border-top: 3px solid ${(props) => props.theme.color.lightgray};
`;

const PointHistory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  .leftDiv {
    display: flex;
    align-items: flex-start;
    p {
      &:nth-child(1) {
        font-size: ${(props) => props.theme.fontSize.sm};
        color: ${(props) => props.theme.color.lightgray};
      }
      & + p {
        padding-left: 10px;
      }
    }
  }
  .rightDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .red {
      color: ${(props) => props.theme.color.red};
    }
    .blue {
      color: ${(props) => props.theme.color.blue};
    }
    .green {
      color: ${(props) => props.theme.color.green};
    }
    p:nth-child(2) {
      font-size: ${(props) => props.theme.fontSize.sm};
      color: ${(props) => props.theme.color.lightgray};
      margin-top: 10px;
    }
  }
`;

const UsageHistory = ({ ...v }) => {
  const { pot_Date, pot_Change, pot_Reason, pot_Amount } = v;

  return (
    <UsageHistoryContainer>
      <PointHistory>
        <div className="leftDiv">
          <p>{`${pot_Date.slice(5, 7)}.${pot_Date.slice(8, 10)}`}</p>
          <p>
            {pot_Change.toLocaleString()}P{' '}
            {pot_Reason === 'add'
              ? '충전'
              : pot_Reason === '매칭 충전'
              ? '매칭 충전'
              : '사용'}
          </p>
        </div>
        <div className="rightDiv">
          <p
            className={`${
              pot_Reason === 'add'
                ? 'blue'
                : pot_Reason === '매칭 충전'
                ? 'green'
                : 'red'
            }`}
          >
            {pot_Reason === 'use' && '-'}
            {pot_Change.toLocaleString()}P
          </p>
          <p>{pot_Amount.toLocaleString()}P</p>
        </div>
      </PointHistory>
    </UsageHistoryContainer>
  );
};

export default UsageHistory;
