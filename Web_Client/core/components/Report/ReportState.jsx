import React from 'react';
import styled from 'styled-components';

const ReportState = ({ ...props }) => {
  const { ns_Reason, ns_Target, ns_Etc, ns_Date, ns_Status } = props;
  console.log(props);
  return (
    <ReportStateContainer>
      <div>신고 일시 : {ns_Date.replace('T', ' ')}</div>
      <div>신고 사유 : {ns_Reason}</div>
      <div>신고 대상 : {ns_Target}</div>
      <div>처리 상태 : {ns_Status}</div>
    </ReportStateContainer>
  );
};

const ReportStateContainer = styled.div`
  padding: 20px;
  border: 1px solid ${(props) => props.theme.color.black};
  border-radius: 10px;
  /* display: flex; */
  width: 100%;
  height: 100%;
`;

export default ReportState;
