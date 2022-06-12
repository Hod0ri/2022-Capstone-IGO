import React, { useState } from 'react';
import FindId from '../FindId';
import InputBox from '../Common/InputBox';
import styled from 'styled-components';
import Button from '../Common/Button';

const FindPwArea = styled.div`
  margin: 0 auto;
  width: 80%;
  p {
    margin-top: 30px;
    margin-bottom: 10px;
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
  //inputData
  const [inputData, setInputData] = useState({
    user_Name: '',
    user_Phone: '',
    user_Email: '',
  });

  return (
    <>
      <FindPwArea>
        <p>이메일</p>
        <InputBox
          placeholder="example@igo.com"
          type="email"
          onChange={(e) =>
            setInputData({ ...inputData, user_Email: e.target.value })
          }
          value={inputData['user_Email']}
        />
        <p>이름</p>
        <InputBox
          placeholder="이름을 입력해주세요."
          onChange={(e) =>
            setInputData({ ...inputData, user_Name: e.target.value })
          }
          value={inputData['user_Name']}
        />

        <p>휴대전화</p>
        <PhoneArea>
          <InputBox
            placeholder="-제외하고 입력"
            type="phone"
            onChange={(e) =>
              setInputData({
                ...inputData,
                user_Phone: filter.phone(e.target.value),
              })
            }
            value={inputData['user_Phone']}
          />
        </PhoneArea>
        <Button>확인</Button>
      </FindPwArea>
    </>
  );
};

export default index;
