import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
const ModalCardButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 60px;
  border-top: 1px solid ${(props) => props.theme.color.black};
  cursor: pointer;
  user-select: none;
  & + & {
    border-left: 1px solid ${(props) => props.theme.color.black};
  }
  &:hover {
    background: ${(props) => props.theme.color.lightgray};
    opacity: 0.8;
  }
  &:active {
    background: ${(props) => props.theme.color.white};
  }
`;
const ModalCardButton = ({
  report,
  setState = () => {},
  userNick,
  onClick = async () => {},
}) => {
  return (
    <ModalCardButtonContainer>
      <ButtonContainer
        onClick={async () => {
          await onClick()
            .then(() => {
              alert('신고가 접수되었습니다.'), setState(false);
            })
            .catch((err) => {
              const { ns_Target, ns_Reason, ns_Etc } = err.response.data.err;
              let errMessage = [];
              ns_Target && errMessage.push('ns_Target');
              alert(err.response.data.err.ns_Target);
            });
        }}
      >
        확인
      </ButtonContainer>
      <ButtonContainer onClick={() => setState(false)}>취소</ButtonContainer>
    </ModalCardButtonContainer>
  );
};

export default ModalCardButton;
