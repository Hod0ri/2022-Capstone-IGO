import axios from "axios";
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
const ModalCardButton = ({ report, setState = () => {}, userNick }) => {
  return (
    <ModalCardButtonContainer>
      <ButtonContainer
        onClick={async () =>
          await axios
            .post("/api/issue", {
              ns_Target: userNick,
              ns_Reason: report ? "노쇼" : "기타",
              ns_Etc: "",
            })
            .then(() => setState(false))
            .catch((e) => alert(`${e.code}로 인해 서버 통신에 실패했습니다!`))
        }
      >
        확인
      </ButtonContainer>
      <ButtonContainer onClick={async () => setState(false)}>
        취소
      </ButtonContainer>
    </ModalCardButtonContainer>
  );
};

export default ModalCardButton;
