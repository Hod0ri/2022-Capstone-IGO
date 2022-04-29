import React from "react";
import styled from "styled-components";
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
const ModalCardButton = ({ setState = () => {} }) => {
  return (
    <ModalCardButtonContainer>
      <ButtonContainer onClick={() => console.log("확인버튼 클릭됨")}>
        확인
      </ButtonContainer>
      <ButtonContainer onClick={() => setState(false)}>취소</ButtonContainer>
    </ModalCardButtonContainer>
  );
};

export default ModalCardButton;
