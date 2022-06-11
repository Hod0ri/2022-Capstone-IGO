import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import UserLogo from '../UserLogo';
import Report from './type/Report';
import ModalCardButton from './ModalCardButton';
import Star from './type/Star';
import { fetchApi } from '../../api/fetchApi';
const ModalCardPositionContainer = styled.div`
  z-index: 10000;
  display: flex;
  align-items: center;
  backdrop-filter: blur(3px);
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 100vw;
  bottom: 100vh;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: fade-out 0.5s ease-in-out;

  ${(props) =>
    !props.view &&
    css`
      display: none;
    `}
  .none {
    display: none;
  }
`;
const ModalCardContainer = styled.div`
  overflow: hidden;
  background-color: ${(props) => props.theme.color.white};
  width: 80%;
  min-height: 200px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.lightgray};
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
  .mt-10 {
    margin-top: 10px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  .block {
    flex-direction: row;
  }
`;

const ModalCard = ({
  type = 'report',
  onClickDisableDisplay: disableDisplay,
  ...value
}) => {
  const [report, setReport] = useState('노쇼');
  //모달상태
  const [display, setDisplay] = useState(true);
  const [isClickModal, setIsClickModal] = useState(false);
  const outside = useRef(null);
  const { mm_Driver: user_Nick } = value;
  const onClose = (e) => {
    outside.current === e.target && disableDisplay();
  };
  const onClickReport = async () => {
    const reportData = {
      ns_Target: user_Nick,
      ns_Reason: report,
    };
    return await fetchApi.issue.post(reportData).then((res) => res.data);
  };

  return (
    <ModalCardPositionContainer
      view={display ? true : false}
      ref={outside}
      onClick={(e) => onClose(e)}
    >
      <ModalCardContainer>
        <div className="mt-30" />
        <UserLogo user_Nick={user_Nick} />
        <div className="mt-20" />
        {type == 'report' && <Report state={setReport} userNick={user_Nick} />}
        {type == 'star' && <Star />}
        <div className="mt-20" />
        <ModalCardButton
          report={report}
          setState={() => disableDisplay()}
          userNick={user_Nick}
          onClick={() => onClickReport()}
        />
      </ModalCardContainer>
    </ModalCardPositionContainer>
  );
};

export default ModalCard;
