import React from 'react';
import styled from 'styled-components';
import InputBox from '../Common/InputBox';
import Button from '../Common/Button';

const BodyStyle = styled.div`
  margin: 0 auto;
  width: 80%;
  p {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  //InputBox number type 화살표 제거
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  & > button {
    margin-top: 30px;
  }
`;

const PhoneArea = styled.div`
  display: flex;
  margin-bottom: 15px;

  InputBox {
    flex: 2;
  }

  Button {
    margin-left: 15px;
    width: 150px;
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const index = () => {
  return (
    <>
      <BodyStyle>
        <p>이름</p>
        <InputBox placeholder="이름을 입력해주세요." />

        <p>휴대전화</p>
        <PhoneArea>
          <InputBox placeholder="-제외하고 입력" type="number" />
          <Button color="lightgray">인증요청</Button>
        </PhoneArea>
        <InputBox placeholder="인증번호를 입력해주세요." type="number" />
        <Button>확인</Button>
      </BodyStyle>
    </>
  );
};

export default index;
