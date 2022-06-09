import React from 'react';
import styled from 'styled-components';

const ReservationButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.button`
  width: 135px;
  height: 40px;
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
