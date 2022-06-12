import Image from 'next/image';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Siren from '../icon/siren.png';
const ReportCardContainer = styled.div`
  width: 80%;
  .flex {
    display: flex;
  }
  .report {
    align-items: flex-end;
    justify-content: center;
    p {
      margin-left: 10px;
      padding-bottom: 5px;
    }
  }
`;
const ReportSelectButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ReportCard = styled.button`
  width: 70px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid
    ${(props) =>
      props.color === 'red' ? props.theme.color.red : props.theme.color.gray};
  p {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
  ${(props) =>
    props.active &&
    css`
      background-color: ${props.color === 'red'
        ? props.theme.color.red
        : props.theme.color.lightgray};
      opacity: 0.8;
    `}
`;

const Report = ({ state, userNick = '닉네임X' }) => {
  const [report, setReport] = useState(true);
  const [etc, setEtc] = useState(false);
  const onClick = (boolean) => {
    if (boolean) {
      state('노쇼');
      setReport(true);
      setEtc(false);
    } else {
      state('기타');
      setReport(false);
      setEtc(true);
    }
  };
  return (
    <ReportCardContainer>
      <ReportSelectButtonContainer>
        <ReportCard color={'red'} onClick={() => onClick(true)} active={report}>
          노쇼
        </ReportCard>
        <ReportCard onClick={() => onClick(false)} active={etc}>
          기타
        </ReportCard>
      </ReportSelectButtonContainer>
      <div className="mt-10" />
      <div className="flex report">
        <Image src={Siren} width={35} height={35} alt={'Siren'} />
        <p>{userNick}님을 신고하시겠습니까?</p>
      </div>
    </ReportCardContainer>
  );
};

export default Report;
