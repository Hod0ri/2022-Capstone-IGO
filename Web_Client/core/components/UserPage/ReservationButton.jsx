import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fetchApi } from '../../api/fetchApi';
import { atomUserDriver } from '../../atoms/loginState';

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
  &.userCancel {
    background: ${(props) => props.theme.color.orange};
    font-size: ${(props) => props.theme.fontSize.md};
    width: 100%;
  }
`;

const ReservationButton = ({ ...v }) => {
  const { mm_Member } = v;
  const userDriver = useRecoilValue(atomUserDriver);
  const onClickPostMatch = async () => {
    await fetchApi.match
      .post()
      .then(() => {
        location.reload();
      })
      .catch((e) => e.response);
  };
  const onClickPostCancel = async () => {
    await fetchApi.matchlog
      .delete(mm_Member)
      .then(() => {
        location.reload();
      })
      .catch((e) => e.response);
  };
  return (
    <>
      {userDriver ? (
        <ReservationButtonContainer>
          <ButtonContainer
            className="confirm"
            onClick={() => onClickPostMatch()}
          >
            <p>예약확인</p>
          </ButtonContainer>
          <ButtonContainer
            className="cancel"
            onClick={() => onClickPostCancel()}
          >
            <p>예약취소</p>
          </ButtonContainer>
        </ReservationButtonContainer>
      ) : (
        <ReservationButtonContainer>
          <ButtonContainer
            className="userCancel"
            onClick={() => onClickPostCancel()}
          >
            <p>예약취소</p>
          </ButtonContainer>
        </ReservationButtonContainer>
      )}
    </>
  );
};

export default ReservationButton;
