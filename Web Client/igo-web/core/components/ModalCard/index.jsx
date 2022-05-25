import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import UserLogo from '../UserLogo';
import Report from './type/Report';
import ModalCardButton from './ModalCardButton';
import Star from './type/Star';
const ModalCardPositionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 100vw;
  bottom: 100vh;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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
  border: 1px solid ${(props) => props.theme.color.black};
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

const ModalCard = ({ type = 'report', userNick = '닉네임X' }) => {
  const [report, setReport] = useState('false');
  //모달상태
  const [display, setDisplay] = useState(true);
  return (
    <ModalCardPositionContainer view={display ? true : false}>
      <ModalCardContainer>
        <div className="mt-30" />
        <UserLogo nickname={userNick} />
        <div className="mt-20" />
        {type == 'report' && <Report state={setReport} userNick={userNick} />}
        {type == 'star' && <Star />}
        <div className="mt-20" />
        <ModalCardButton
          report={report}
          setState={setDisplay}
          userNick={userNick}
        />
      </ModalCardContainer>
    </ModalCardPositionContainer>
  );
};

export default ModalCard;
