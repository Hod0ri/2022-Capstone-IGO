import React from "react";
import styled from "styled-components";

const ReservationButtonContainer = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.button`
  width: 120px;
  border-radius: 30px;
  border: none;
  color: ${(props) => props.theme.color.white};
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.7;
  }
  &.confirm {
    background: ${(props) => props.theme.color.blue};
    font-size: ${(props) => props.theme.fontSize.sm};
  }
  &.cancel {
    background: ${(props) => props.theme.color.orange};
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const ReservationButton = () => {
  return (
    <ReservationButtonContainer>
      <ButtonContainer className="confirm">
        <p>예약확인</p>
      </ButtonContainer>
      <ButtonContainer className="cancel">
        <p>예약취소</p>
      </ButtonContainer>
    </ReservationButtonContainer>
  );
};

export default ReservationButton;
