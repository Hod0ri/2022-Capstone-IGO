import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { fetchAuth } from '../../../api/fetchAuth';

const FindModalArea = styled.div`
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
  p {
    font-size: ${(props) => props.theme.fontSize.md};
  }
  .cancelBtn {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
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

const FindModalCard = ({ findId, setDisplay }) => {
  useEffect(() => {
    const getId = async () => {
      await fetchAuth
        .refresh()
        .then((res) => {
          console.log(res);
          setFindId(res.data.result);
        })
        .catch((e) => {});
    };
    !findId && getId();
  }, [findId]);

  return (
    <FindModalArea>
      <ModalCardContainer>
        <p>아이디 찾기 결과</p>
        <p>{findId}</p>
        <div className="cancelBtn">
          <ButtonContainer onClick={() => setDisplay(false)}>
            확인
          </ButtonContainer>
        </div>
      </ModalCardContainer>
    </FindModalArea>
  );
};

export default FindModalCard;
